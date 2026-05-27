import { useState } from 'react';
import { MapPin, Award, Star } from 'lucide-react';

interface Hub {
  id: string;
  city: string;
  country: string;
  role: string;
  focus: string;
  x: number; // Percentage coordinate for stylized visual map
  y: number;
}

const HUBS: Hub[] = [
  { id: 'budapest', city: 'Будапешт', country: 'Венгрия', role: 'Центральный офис ЕС', focus: 'Программы ВНЖ за жилье, разморозка счетов', x: 48, y: 35 },
  { id: 'madrid', city: 'Мадрид', country: 'Испания', role: 'Юго-Западный форпост', focus: 'Визы цифрового кочевника, стартап визы, недвижимость', x: 42, y: 39 },
  { id: 'london', city: 'Лондон', country: 'Великобритания', role: 'Стратегическое партнерство', focus: 'Управление активами, репатриация ЕС', x: 44, y: 30 },
  { id: 'valetta', city: 'Валетта', country: 'Мальта', role: 'Средиземноморское представительство', focus: 'Премиальное ПМЖ, гражданство за инвестиции', x: 49, y: 44 },
  { id: 'dubai', city: 'Дубай', country: 'ОАЭ', role: 'Ближневосточный хаб', focus: 'Золотые резиденции, безналоговые компании', x: 58, y: 48 },
  { id: 'geneva', city: 'Женева', country: 'Швейцария', role: 'Финансовый комплаенс', focus: 'Защита капитала, частный банкинг, суверенные фонды', x: 46, y: 36 }
];

export function GlobalHubs() {
  const [selectedHub, setSelectedHub] = useState<Hub>(HUBS[0]);

  return (
    <section className="border-t border-[var(--color-rule)] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">География</p>
          <h3 className="mt-4 font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl">
            Хабы не как витрина, а как рабочие точки.
          </h3>
          <p className="body-copy mt-6">
            От Будапешта до Дубая — наше присутствие в ключевых юрисдикциях гарантирует безукоризненный сервис, прямой контакт с государственными органами и стопроцентную конфиденциальность процесса.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-start">
          <div className="surface relative aspect-[1.55/1] min-h-[320px] overflow-hidden p-4 select-none">
            <div className="absolute inset-x-8 inset-y-10 border border-[var(--color-rule)]">
              <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">карта присутствия</span>
            </div>

            {HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                  aria-label={`Показать хаб: ${hub.city}`}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <div className={`grid h-7 w-7 place-items-center border transition-colors duration-200 ease-out ${
                      isSelected 
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]' 
                        : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] text-[var(--color-accent)] group-hover:border-[var(--color-accent)]'
                    }`}>
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <span className={`absolute left-9 whitespace-nowrap border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-opacity duration-150 ease-out ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
                      {hub.city}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="surface border-l-4 border-l-[var(--color-accent)] p-6 md:p-8">
                <div>
              <div className="mb-6 flex items-center justify-between gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">
                      {selectedHub.role}
                    </span>
                <MapPin className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>

              <h4 className="mb-2 font-display text-4xl font-light text-[var(--color-ink)]">
                    {selectedHub.city}
                  </h4>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">
                    {selectedHub.country}
                  </p>
                  
              <div className="space-y-6 border-t border-[var(--color-rule)] pt-6">
                    <div>
                  <span className="mb-2 block font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Специфика</span>
                  <p className="body-copy text-sm">
                        {selectedHub.focus}
                      </p>
                    </div>

                <div className="grid grid-cols-1 gap-4 border-t border-[var(--color-rule)] pt-6 text-sm text-[var(--color-ink-2)] sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                        <span>Лицензированные юристы</span>
                      </div>
                      <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                        <span>Закрытое сопровождение</span>
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mt-8">
                  <a
                    href="#contact"
                className="inline-flex whitespace-nowrap font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)] transition-colors duration-200 ease-out hover:text-[var(--color-ink)]"
                  >
                Связаться с юристом хаба
                  </a>
                </div>
          </div>

        </div>
      </div>
    </section>
  );
}
