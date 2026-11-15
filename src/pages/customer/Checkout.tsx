import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Card, DescriptionList, ErrorBanner, KeyValue, RadioGroup } from '../../components/ui';
import { deliveryFee, paymentOptions, quietHubDiscount, voucherCodes } from '../../mocks/orders';
import { formatVnd } from '../../utils/formatVnd';
import { hubMenu } from '../../mocks/menu';
import { useAppState } from '../../state/AppState';
import { orderService } from '../../services/orderService';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, notify } = useAppState();
  const [address,setAddress]=useState('12 Nguyen Hue, District 1');
  const [placing,setPlacing]=useState(false);
  const [orderError,setOrderError]=useState('');
  const subtotal=hubMenu.reduce((sum,item)=>sum+item.price*(cart[item.id]||0),0);
  const [codeInput, setCodeInput] = useState('SAIGON10');
  const [appliedCode, setAppliedCode] = useState<string | null>('SAIGON10');
  const [voucherError, setVoucherError] = useState('');
  const [payment, setPayment] = useState('cash');

  const rate = appliedCode ? voucherCodes[appliedCode] : 0;
  const voucher = -Math.round(subtotal * rate);
  const total = subtotal + deliveryFee + voucher - quietHubDiscount;
  const cartItems=hubMenu.filter(item=>(cart[item.id]||0)>0);
  const placeOrder=async()=>{if(!cartItems.length){notify('Add an item before checkout');return;}if(address.trim().length<8){notify('Enter a complete delivery address');return;}setOrderError('');setPlacing(true);try{await orderService.createOrder({hubId:'district3',items:cartItems.map(item=>({menuItemId:item.id,quantity:cart[item.id]})),address:address.trim(),paymentMethod:payment as 'cash'|'wallet'|'card'});clearCart();navigate('/orders/placed');}catch{setOrderError('We could not place your order. Check your connection and try again.');}finally{setPlacing(false);}};

  const applyVoucher = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = codeInput.trim().toUpperCase();
    if (voucherCodes[code]) {
      setAppliedCode(code);
      setVoucherError('');
    } else {
      setAppliedCode(null);
      setVoucherError('This voucher code is not valid.');
    }
  };

  const summary = (
    <Card as="section" aria-label="Order summary">
      <DescriptionList>
        <KeyValue label="Subtotal" value={formatVnd(subtotal)} />
        <KeyValue label="Delivery fee (2-4 km)" value={formatVnd(deliveryFee)} />
        {appliedCode ? (
          <KeyValue label={`Voucher ${appliedCode} (${Math.round(rate * 100)}%, 1 max)`} value={formatVnd(voucher)} tone="green" />
        ) : null}
        <KeyValue label="Quiet-hub discount" value={formatVnd(-quietHubDiscount)} tone="green" />
      </DescriptionList>
      <hr className="m-0 h-px border-0 bg-line" />
      <DescriptionList>
        <KeyValue label="Total" value={formatVnd(total)} strong />
      </DescriptionList>
    </Card>
  );

  return (
    <ScreenLayout title="Checkout" width="wide">
      {orderError&&<div className="mb-5"><ErrorBanner>{orderError}</ErrorBanner></div>}
      <Split
        reverseOnMobile={false}
        sticky
        primary={
          <>
            <Section title="Cooked at Hub District 3 · ~25 min">
              <Card variant="muted">
                <label className="grid gap-2 text-sm font-semibold">Delivery address<input value={address} onChange={event=>setAddress(event.target.value)} required minLength={8} className="min-h-field rounded-field border border-line bg-white px-3 font-normal"/><span className="font-normal text-muted">3.1 km · Address must include a street and district.</span></label>
              </Card>
            </Section>
            <Section title="Items in your order"><Card>{cartItems.length?cartItems.map(item=><div key={item.id} className="flex justify-between border-b border-line py-2 text-sm"><span>{cart[item.id]} × {item.name}</span><strong>{formatVnd(item.price*cart[item.id])}</strong></div>):<p className="m-0 text-sm text-muted">Your cart is empty. <button type="button" className="font-semibold text-navy underline" onClick={()=>navigate('/hubs/district3')}>Browse the menu</button></p>}</Card></Section>
            <form onSubmit={applyVoucher} className="flex flex-col gap-1.5" noValidate>
              <div className="flex gap-2">
                <label className="sr-only" htmlFor="voucherCode">
                  Voucher code
                </label>
                <input
                  id="voucherCode"
                  value={codeInput}
                  onChange={(event) => setCodeInput(event.target.value)}
                  aria-invalid={Boolean(voucherError)}
                  aria-describedby={voucherError ? 'voucherError' : undefined}
                  className="min-h-field min-w-0 flex-1 rounded-field border border-dashed border-navy bg-navy-soft px-4 font-semibold text-navy outline-none focus-visible:ring-2 focus-visible:ring-blue/50"
                />
                <button
                  type="submit"
                  className="min-h-field rounded-field bg-navy px-5 text-[15px] font-semibold text-white transition-colors hover:bg-blue active:scale-95"
                >
                  Apply
                </button>
              </div>
              {voucherError ? (
                <p id="voucherError" role="alert" className="m-0 text-xs font-medium text-danger">
                  {voucherError}
                </p>
              ) : null}
            </form>
            <Section title="Payment method">
              <RadioGroup label="Payment method" options={paymentOptions} value={payment} onChange={setPayment} />
            </Section>
          </>
        }
        secondary={
          <>
            {summary}
            <Button disabled={placing||cartItems.length===0} onClick={placeOrder}>{placing?'Placing order…':`Place order · ${formatVnd(total)}`}</Button>
          </>
        }
      />
    </ScreenLayout>
  );
}
