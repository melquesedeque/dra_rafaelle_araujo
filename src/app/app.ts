import { Component } from '@angular/core';

interface CatalogItem {
  title: string;
  description: string;
  duration: string;
  price: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly catalogItems: CatalogItem[] = [
    {
      title: 'Consulta estética',
      description:
        'Avaliação para elaboração de um plano de tratamento personalizado com tecnologia avançada de imagem e inteligência artificial para uma análise profunda e precisa da pele.',
      duration: '1h30',
      price: 'R$ 380',
    },
    {
      title: 'Limpeza de pele tradicional',
      description:
        'Remove impurezas, aumenta a hidratação, controla a oleosidade e prepara sua pele para absorver melhor os ativos. Pele mais leve, macia e uniforme.',
      duration: '2h',
      price: 'R$ 320',
    },
    {
      title: 'Aquapeel coreano',
      description:
        'Tratamento completo que promove purificação, hidratação intensa e renovação com tecnologia coreana de forma confortável e indolor. Pele mais saudável, luminosa e uniforme.',
      duration: '1h',
      price: 'R$ 450',
    },
    {
      title: 'Limpeza de pele + Aquapeel',
      description:
        'Associa a limpeza manual profunda à tecnologia coreana na mesma sessão, promovendo máxima purificação, renovação avançada e hidratação intensa.',
      duration: '2h15',
      price: 'R$ 580',
    },
    {
      title: 'Peeling tradicional',
      description:
        'Reduz manchas, acne, poros, rugas e sinais de envelhecimento. Resultados visíveis, textura renovada e aquele glow que não passa despercebido.',
      duration: '1h',
      price: 'R$ 350',
    },
    {
      title: 'Peeling coreano - Glass Skin',
      description:
        'Renovação suave com tecnologia e ativos coreanos, promovendo uniformização da pele e luminosidade imediata, com efeito pele de vidro.',
      duration: '1h',
      price: 'R$ 350',
    },
    {
      title: 'Microagulhamento',
      description:
        'Estimula colágeno, melhora a textura da pele e suaviza rugas, cicatrizes e manchas. Para quem busca resultados mais profundos e duradouros.',
      duration: '1h30',
      price: 'R$ 450',
    },
    {
      title: 'Nanoagulhamento',
      description:
        'Para uma pele mais luminosa, uniforme e saudável: fortalece a barreira da pele, suaviza manchas, melasma e sinais de fadiga, com máximo conforto.',
      duration: '1h30',
      price: 'R$ 420',
    },
    {
      title: 'Hidragloss',
      description:
        'Tratamento especial para lábios mais hidratados, jovens e saudáveis, proporcionando hidratação intensa, maciez e um visual mais jovem.',
      duration: '1h',
      price: 'R$ 320',
    },
    {
      title: 'Revitalização facial',
      description:
        'Hidratação profunda com ação imediata na textura e viço da pele. Devolve luminosidade natural, promovendo uma pele mais uniforme e saudável.',
      duration: '1h',
      price: 'R$ 210',
    },
    {
      title: 'Rejuvenescimento facial',
      description:
        'Estimula a produção de colágeno e melhora a qualidade da pele, suavizando rugas, linhas de expressão e sinais de flacidez.',
      duration: '1h',
      price: 'R$ 210',
    },
    {
      title: 'Recuperação de barreira',
      description:
        'Tratamento reparador para fortalecer a barreira cutânea devolvendo proteção, equilíbrio e vitalidade com ativos de alta performance.',
      duration: '1h',
      price: 'R$ 210',
    },
  ];
}
