import { Component, HostListener, OnDestroy, computed, signal } from '@angular/core';

interface CatalogItem {
  title: string;
  description: string;
  details: string[];
  duration: string;
  price: string;
}

interface ResultItem {
  procedure: string;
  before: string;
  after: string;
}

interface ResultSlide extends ResultItem {
  id: string;
  index: number;
  position: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private readonly carouselIntervalMs = 7000;
  private carouselTimer = window.setInterval(() => this.nextResult(false), this.carouselIntervalMs);
  private carouselResetTimer: number | undefined;

  protected expandedItemTitle: string | null = null;
  protected currentResultIndex = signal(0);
  protected carouselDirection = signal<'previous' | 'next'>('next');
  protected carouselTrackIndex = signal(1);
  protected carouselTransitionEnabled = signal(true);
  protected carouselCardWidth = signal(this.getCarouselCardWidth());
  protected carouselGap = signal(this.getCarouselGap());

  protected readonly catalogItems: CatalogItem[] = [
    {
      title: 'Consulta estética',
      description:
        'Avaliação para elaboração de um plano de tratamento personalizado, com uma análise detalhada e precisa da pele.',
      details: [
        'Avaliação completa do estado da pele, elaborando um plano de tratamento personalizado e alinhando skincare para alcançar a sua melhor aparência.',
        '*Incluso uma revitalização facial, visando melhorar o aspecto da pele de forma imediata.',
      ],
      duration: '1h30',
      price: 'R$ 150',
    },
    {
      title: 'Limpeza de pele tradicional',
      description:
        'Remove impurezas, aumenta a hidratação, controla a oleosidade e prepara sua pele para absorver melhor os ativos. Pele mais leve, macia e uniforme.',
      details: [
        'Remove impurezas, aumenta a hidratação e controla o excesso de oleosidade, deixando a pele mais limpa, macia e saudável. Previne acne, cravos e outras imperfeições, além de preparar a pele para outros procedimentos.',
        '*Todos os produtos e aparelhos são escolhidos minuciosamente para o que sua pele mais necessita no momento.',
      ],
      duration: '2h',
      price: 'R$ 150',
    },
    {
      title: 'Peeling tradicional',
      description:
        'Reduz manchas, acne, poros, rugas e sinais de envelhecimento. Resultados visíveis, textura renovada e aquele glow que não passa despercebido.',
      details: [
        'Reduz manchas, cicatrizes, poros dilatados, acne, linhas finas e rugas. Melhora a textura e aparência, traz mais luminosidade e atenua os sinais de envelhecimento. Trabalhamos com diferentes tipos de peelings, podendo ser mais superficiais ou descamativos.',
      ],
      duration: '1h',
      price: 'R$ 170',
    },
    {
      title: 'Microagulhamento',
      description:
        'Estimula colágeno, melhora a textura da pele e suaviza rugas, cicatrizes e manchas. Para quem busca resultados mais profundos e duradouros.',
      details: [
        'Estimula a produção natural de colágeno e elastina, promovendo melhora da textura, uniformização do tom, suavização de linhas finas e rugas, além de auxiliar no tratamento de cicatrizes de acne e manchas. Procedimento personalizado, com produtos selecionados de acordo com as necessidades da pele de cada paciente.',
        '*Para a realização do procedimento, é utilizado anestésico tópico, aplicado 1h antes da sessão.',
      ],
      duration: '1h30',
      price: 'R$ 250,00',
    },
    {
      title: 'Nanoagulhamento',
      description:
        'Para uma pele mais luminosa, uniforme e saudável: fortalece a barreira da pele, suaviza manchas, melasma e sinais de fadiga, com máximo conforto.',
      details: [
        'Técnica realizada com agulhas ultrafinas, que aumentam a permeação de ativos na pele, potencializando os resultados do tratamento com muito mais conforto e sem dor.',
        'É indicado para o tratamento de melasma, manchas em geral, pele com sinais de fadiga e perda de viço, além de contribuir para uma pele mais uniforme, luminosa e saudável. *Não é necessário o uso de anestésico.',
      ],
      duration: '1h30',
      price: 'R$ 220',
    },
    {
      title: 'Hidragloss',
      description:
        'Tratamento especial para lábios mais hidratados, jovens e saudáveis, proporcionando hidratação intensa, maciez e um visual mais jovem.',
      details: [
        'Procedimento eficaz no tratamento de lábios ressecados para regenerar, recuperar a maciez e suavizar linhas finas. Incluso SPA facial na mesma sessão.',
        '*não é necessário uso de anestésico.',
      ],
      duration: '1h',
      price: 'R$ 190',
    },
    {
      title: 'Revitalização facial',
      description:
        'Hidratação profunda com ação imediata na textura e viço da pele. Devolve luminosidade natural, promovendo uma pele mais uniforme e saudável.',
      details: [
        'Indicado para peles desidratadas, opacas e com perda de viço. Ideal para restaurar a hidratação, melhorar a qualidade da pele e devolver conforto, vitalidade e aparência saudável.',
      ],
      duration: '1h',
      price: 'R$ 120',
    },
    {
      title: 'Rejuvenescimento facial',
      description:
        'Estimula a produção de colágeno e melhora a qualidade da pele, suavizando rugas, linhas de expressão e sinais de flacidez.',
      details: [
        'Indicado para quem busca prevenção e tratamento do envelhecimento cutâneo, promovendo uma pele mais firme, uniforme, revitalizada e com aspecto mais jovem.',
      ],
      duration: '1h',
      price: 'R$ 120',
    },
    {
      title: 'Recuperação de barreira',
      description:
        'Tratamento reparador para fortalecer a barreira cutânea devolvendo proteção, equilíbrio e vitalidade com ativos de alta performance.',
      details: [
        'Indicado para peles ressecadas, sensíveis, reativas, descamativas e com tendência à rosácea, além de ser ideal para recuperação da pele após procedimentos estéticos ou uso de ácidos.',
      ],
      duration: '1h',
      price: 'R$ 120',
    },
  ];

  protected readonly resultItems: ResultItem[] = [
    {
      procedure: 'Limpeza de pele',
      before: 'results/paciente-01-antes.png',
      after: 'results/paciente-01-depois.png',
    },
    {
      procedure: 'Rejuvenescimento facial',
      before: 'results/paciente-02-antes.png',
      after: 'results/paciente-02-depois.png',
    },
    {
      procedure: 'Tratamento acne',
      before: 'results/paciente-03-antes.png',
      after: 'results/paciente-03-depois.png',
    },
  ];

  protected readonly currentResult = computed(() => this.resultItems[this.currentResultIndex()]);
  protected readonly carouselSlides = computed<ResultSlide[]>(() => {
    const lastIndex = this.resultItems.length - 1;
    const firstItem = this.resultItems[0];
    const lastItem = this.resultItems[lastIndex];

    return [
      { ...lastItem, id: 'result-clone-before', index: lastIndex, position: 0 },
      ...this.resultItems.map((item, index) => ({
        ...item,
        id: `result-${index}`,
        index,
        position: index + 1,
      })),
      {
        ...firstItem,
        id: 'result-clone-after',
        index: 0,
        position: this.resultItems.length + 1,
      },
    ];
  });
  protected readonly carouselTrackTransform = computed(() => {
    const step = this.carouselCardWidth() + this.carouselGap();
    const offset = this.carouselTrackIndex() * step + this.carouselCardWidth() / 2;

    return `translateX(-${offset}px)`;
  });

  @HostListener('window:resize')
  protected updateCarouselMetrics(): void {
    this.carouselCardWidth.set(this.getCarouselCardWidth());
    this.carouselGap.set(this.getCarouselGap());
  }

  protected isExpanded(title: string): boolean {
    return this.expandedItemTitle === title;
  }

  protected toggleInfo(title: string): void {
    this.expandedItemTitle = this.isExpanded(title) ? null : title;
  }

  protected previousResult(): void {
    this.carouselDirection.set('previous');
    this.carouselTransitionEnabled.set(true);
    this.currentResultIndex.update(
      (currentIndex) => (currentIndex - 1 + this.resultItems.length) % this.resultItems.length,
    );
    this.carouselTrackIndex.update((currentIndex) => currentIndex - 1);
    this.restartCarouselTimer();
  }

  protected nextResult(restartTimer = true): void {
    this.carouselDirection.set('next');
    this.carouselTransitionEnabled.set(true);
    this.currentResultIndex.update((currentIndex) => (currentIndex + 1) % this.resultItems.length);
    this.carouselTrackIndex.update((currentIndex) => currentIndex + 1);

    if (restartTimer) {
      this.restartCarouselTimer();
    }
  }

  protected isActiveSlide(slide: ResultSlide): boolean {
    return slide.position === this.carouselTrackIndex();
  }

  protected handleCarouselTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    const lastItemTrackIndex = this.resultItems.length;
    const cloneAfterTrackIndex = this.resultItems.length + 1;
    const trackIndex = this.carouselTrackIndex();

    if (trackIndex === 0) {
      this.snapCarouselTo(lastItemTrackIndex);
      return;
    }

    if (trackIndex === cloneAfterTrackIndex) {
      this.snapCarouselTo(1);
    }
  }

  ngOnDestroy(): void {
    window.clearInterval(this.carouselTimer);
    window.clearTimeout(this.carouselResetTimer);
  }

  private restartCarouselTimer(): void {
    window.clearInterval(this.carouselTimer);
    this.carouselTimer = window.setInterval(() => this.nextResult(false), this.carouselIntervalMs);
  }

  private snapCarouselTo(trackIndex: number): void {
    window.clearTimeout(this.carouselResetTimer);
    this.carouselTransitionEnabled.set(false);
    this.carouselTrackIndex.set(trackIndex);
    this.carouselResetTimer = window.setTimeout(() => this.carouselTransitionEnabled.set(true), 40);
  }

  private getCarouselCardWidth(): number {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 640) {
      return Math.min(250, Math.max(190, viewportWidth - 180));
    }

    return Math.min(680, Math.max(320, viewportWidth - 260));
  }

  private getCarouselGap(): number {
    return window.innerWidth <= 640 ? 8 : 16;
  }
}
