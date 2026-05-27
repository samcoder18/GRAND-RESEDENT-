import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    country: "Бельгия",
    title: "Бизнес-иммиграция с релокацией компании",
    tags: ["ВНЖ", "Бизнес"],
  },
  {
    country: "Испания",
    title: "Рабочие командировки через Визу ЦК с сопровождением семьи",
    tags: ["Визы", "Работа"],
  },
  {
    country: "Венгрия и Финляндия",
    title: "Успешная разморозка активов и получение долгосрочного ВНЖ",
    tags: ["ВНЖ", "Финансы"],
  }
];

export function Cases() {
  return (
    <section id="cases" className="border-t border-[var(--color-rule)] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
          <p className="section-kicker">Кейсы</p>
          <h3 className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl">
            Работы, которые лучше читать как записи в журнале.
          </h3>
        </div>

        <div className="grid gap-0 border-y border-[var(--color-rule)]">
          {cases.map((item, index) => (
            <article
              key={item.title}
              className="group grid gap-5 border-b border-[var(--color-rule)] py-7 last:border-b-0 md:grid-cols-[0.18fr_0.62fr_0.2fr] md:items-center"
            >
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="border border-[var(--color-rule)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-display text-2xl font-normal text-[var(--color-ink)]">{item.country}</h4>
                <p className="body-copy text-sm">{item.title}</p>
              </div>
              <a
                href="#contact"
                aria-label={`Обсудить похожий кейс: ${item.country}`}
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-rule)] text-[var(--color-accent)] transition-colors duration-200 ease-out hover:border-[var(--color-accent)] md:justify-self-end"
              >
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
