import Link from 'next/link';
import { cn } from '@/lib/utils';

const DonationOptions = () => {
  const options = [
    {
      id: 'zakat',
      title: '🕋 Zakat',
      description: 'Fulfill your Zakat obligation with complete transparency and traceability.',
      features: [
        'Zakat Calculator',
        'Track your impact',
        'Instant receipt',
        'Shariah-compliant'
      ],
      cta: 'Pay Zakat',
      href: '/zakat',
      gradient: 'from-emerald-600 to-emerald-400',
    },
    {
      id: 'qurban',
      title: '🐐 Qurban',
      description: 'Perform Qurban and receive an NFT certificate as proof of your sacrifice.',
      features: [
        'Choose your animal',
        'Real-time updates',
        'NFT certificate',
        'Global reach'
      ],
      cta: 'Donate Qurban',
      href: '/qurban',
      gradient: 'from-amber-600 to-amber-400',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/50 to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-trust">Contribution</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Support our community with Zakat or Qurban donations. Every contribution makes a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {options.map((option) => (
            <div 
              key={option.id}
              className={cn(
                'relative p-0.5 rounded-2xl group',
                'bg-gradient-to-r',
                option.gradient,
                'hover:shadow-lg hover:shadow-trust/20 transition-all duration-300',
                'transform hover:-translate-y-1'
              )}
            >
              <div className="h-full bg-primary/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                <p className="text-text-secondary mb-6 flex-grow">{option.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-text-secondary">
                      <svg 
                        className="w-5 h-5 text-trust mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={option.href}
                  className={cn(
                    'mt-auto w-full py-3 px-6 text-center font-medium rounded-lg transition-colors',
                    'bg-gradient-to-r',
                    option.gradient,
                    'text-primary hover:opacity-90',
                    'flex items-center justify-center space-x-2'
                  )}
                >
                  <span>{option.cta}</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationOptions;
