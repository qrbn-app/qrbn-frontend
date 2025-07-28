import { Metadata } from 'next';
import QurbanStepper from '@/components/qurban/QurbanStepper';

export const metadata: Metadata = {
  title: 'Qurban Donation | QRBN.app',
  description: 'Perform Qurban and receive an NFT certificate as proof of your sacrifice.',
};

export default function QurbanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
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
  );
}
