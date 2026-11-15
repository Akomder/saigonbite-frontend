import { useState } from 'react';
import { ScreenLayout, Section } from '../../components/layout';
import { BarChart, Card, ChipRow, DescriptionList, KeyValue, ProgressBar, Segmented, StatCard } from '../../components/ui';
import { cn } from '../../utils/cn';
import { deliveryStats, hubWorkload, reportFilters, reportStats, reportTabs, salesByDay } from '../../mocks/admin';

type Tab = (typeof reportTabs)[number];
type Filter = (typeof reportFilters)[number];

export default function ManagerReports() {
  const [tab, setTab] = useState<Tab>('Sales');
  const [filter, setFilter] = useState<Filter>('This week ▾');

  return (
    <ScreenLayout title="Reports" width="wide" hideBack>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="md:w-96">
          <Segmented compact label="Report type" options={reportTabs} value={tab} onChange={setTab} />
        </div>
        <ChipRow label="Report filters" items={reportFilters} value={filter} onChange={setFilter} />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {reportStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        <div className={cn('lg:col-span-2', tab !== 'Sales' && 'hidden lg:block')}>
          <Card as="section" aria-label="Sales" className="gap-4 p-4 sm:p-6">
            <h2 className="m-0 text-base font-semibold">Sales, last 7 days (million đ)</h2>
            <BarChart data={salesByDay} highlightIndex={salesByDay.length - 1} label="Sales by day in million dong" />
          </Card>
        </div>
        <div className="flex flex-col gap-5">
          <div className={cn(tab !== 'Hub workload' && 'hidden lg:block')}>
            <Section title="Hub workload now">
              <Card as="section" aria-label="Hub workload" className="gap-3.5">
                {hubWorkload.map((hub) => (
                  <div key={hub.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_2.5rem] items-center gap-2.5 text-sm">
                    <span className="text-muted">{hub.label}</span>
                    <ProgressBar value={hub.value} tone={hub.tone} label={`${hub.label} workload`} />
                    <span className="text-right font-semibold">{Math.round(hub.value * 100)}%</span>
                  </div>
                ))}
              </Card>
            </Section>
          </div>
          <div className={cn(tab !== 'Delivery' && 'hidden lg:block')}>
            <Section title="Delivery performance">
              <Card as="section" aria-label="Delivery performance">
                <DescriptionList>
                  {deliveryStats.map((stat) => (
                    <KeyValue key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
                  ))}
                </DescriptionList>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
