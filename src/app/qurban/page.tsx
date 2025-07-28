import { Metadata } from 'next';
import QurbanStepper from '@/components/qurban/QurbanStepper';

export const metadata: Metadata = {
  title: 'Qurban Donation | QRBN.app',
  description: 'Perform Qurban and receive an NFT certificate as proof of your sacrifice.',
};

export default function QurbanPage() {
  return (
    <div className="relative min-h-[calc(100vh-73px)]">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/geometric-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-trust/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Qurban <span className="text-trust">Donation</span>
            </h1>
            <p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Perform your Qurban with complete transparency and receive an NFT certificate as proof of your sacrifice.
            </p>
            
            <div className="bg-primary/50 backdrop-blur-sm rounded-2xl border border-accent/10 p-6 md:p-8">
              <QurbanStepper />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
