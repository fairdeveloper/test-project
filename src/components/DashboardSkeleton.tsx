// Bu, yükleme sırasında gösterilecek olan animasyonlu iskelet yapısıdır.
export default function DashboardSkeleton() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-10 bg-slate-700 rounded-md w-1/2 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-2">
          <div className="h-8 bg-slate-700 rounded-md w-1/3 mb-4"></div>
          <div className="mb-4 p-3 bg-surface rounded-lg border border-subtle-border space-y-3">
            <div className="flex flex-wrap justify-center gap-1.5">
              {Array.from({ length: 34 }).map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-md bg-slate-700"></div>
              ))}
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-subtle-border min-h-[400px]"></div>
        </div>
        <div className="space-y-8 mt-8 lg:mt-0">
          <div className="w-full">
            <div className="h-8 bg-slate-700 rounded-md w-2/3 mb-4"></div>
            <div className="bg-surface rounded-xl border border-subtle-border p-3 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-slate-700 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}