import { Button } from '@/components/ui/Button';
import { ConnectButton } from '@xellar/kit';

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-trust/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arabic Calligraphy */}
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-trust arabic leading-tight">
              الْبِرُّ مَا اَطْمَأَنَّتْ إِلَيْهِ النَّفْسُ
            </h2>
            <p className="mt-2 text-text-secondary">
              "Righteousness is what brings peace to the soul"
            </p>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-trust">
              Transparent
            </span>{' '}
            Islamic Donations
          </h1>
          
          {/* Description */}
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Give with confidence using blockchain technology. Track your Zakat and Qurban donations with NFT proof and participate in DAO governance.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <ConnectButton 
              className="px-8 py-4 text-lg font-semibold"
              variant="accent"
            >
              Connect Wallet
            </ConnectButton>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100%', label: 'Transparent' },
              { value: '0%', label: 'Fees' },
              { value: '100%', label: 'Shariah Compliant' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="p-4 bg-primary/20 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
