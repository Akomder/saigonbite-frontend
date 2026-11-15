import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenLayout } from "../../components/layout";
import { Button, ErrorBanner, Skeleton } from "../../components/ui";
import { voucherService } from "../../services/voucherService";
export default function AdminVoucherForm() {
  const { voucherId } = useParams();
  const editing = Boolean(voucherId && voucherId !== "new");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(editing);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">(
    "percent",
  );
  const [value, setValue] = useState("10");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [minOrder, setMinOrder] = useState("0");
  const [usageLimit, setUsageLimit] = useState("");
  const [oncePerCustomer, setOnce] = useState(true);
  useEffect(() => {
    if (!editing) return;
    let live = true;
    voucherService
      .list()
      .then((rows) => {
        const v = rows.find((row) => row.id === Number(voucherId));
        if (!v) throw new Error("Voucher not found.");
        if (!live) return;
        setCode(v.code);
        setDescription(v.description);
        setDiscountType(v.discountType);
        setValue(String(v.value));
        setValidFrom(v.validFrom);
        setValidTo(v.validTo);
        setMinOrder(String(v.minOrder));
        setUsageLimit(v.usageLimit === null ? "" : String(v.usageLimit));
        setOnce(v.oncePerCustomer);
      })
      .catch((e) => {
        if (live)
          setError(e instanceof Error ? e.message : "Could not load voucher.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [editing, voucherId]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const input = {
      code,
      description,
      discountType,
      value: Number(value),
      validFrom,
      validTo,
      minOrder: Number(minOrder),
      usageLimit: usageLimit ? Number(usageLimit) : null,
      oncePerCustomer,
    };
    try {
      if (editing) {
        const { code: _code, ...update } = input;
        void _code;
        await voucherService.update(Number(voucherId), update);
      } else await voucherService.create(input);
      navigate("/admin/vouchers");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save voucher.");
    } finally {
      setBusy(false);
    }
  }
  function field(
    label: string,
    name: string,
    value: string,
    set: (value: string) => void,
    type = "text",
  ) {
    return (
      <label className="grid gap-1.5 text-sm font-medium">
        {label}
        <input
          name={name}
          type={type}
          required={name !== "usageLimit"}
          value={value}
          onChange={(e) => set(e.target.value)}
          className="min-h-12 rounded-xl border border-line px-3"
        />
      </label>
    );
  }
  return (
    <ScreenLayout
      title={editing ? "Edit voucher" : "Create voucher"}
      width="default"
    >
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {loading ? (
        <Skeleton className="h-64" />
      ) : (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2 sm:p-8"
        >
          {field("Voucher code", "code", code, setCode)}
          <label className="grid gap-1.5 text-sm font-medium">
            Discount type
            <select
              value={discountType}
              onChange={(e) =>
                setDiscountType(e.target.value as "percent" | "fixed")
              }
              className="min-h-12 rounded-xl border border-line px-3"
            >
              <option value="percent">Percentage</option>
              <option value="fixed">Fixed VND</option>
            </select>
          </label>
          {field(
            discountType === "percent"
              ? "Discount percent"
              : "Discount value (VND)",
            "value",
            value,
            setValue,
            "number",
          )}
          {field("Description", "description", description, setDescription)}
          {field("Valid from", "validFrom", validFrom, setValidFrom, "date")}
          {field("Valid to", "validTo", validTo, setValidTo, "date")}
          {field(
            "Minimum order (VND)",
            "minOrder",
            minOrder,
            setMinOrder,
            "number",
          )}
          {field(
            "Usage limit",
            "usageLimit",
            usageLimit,
            setUsageLimit,
            "number",
          )}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={oncePerCustomer}
              onChange={(e) => setOnce(e.target.checked)}
            />
            Once per customer
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : editing ? "Save changes" : "Create voucher"}
            </Button>
          </div>
        </form>
      )}
    </ScreenLayout>
  );
}
