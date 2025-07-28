import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface QurbanTypeStepProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const qurbanTypes = [
  {
    id: 'goat',
    title: 'Goat/Sheep',
    description: 'One complete animal for your Qurban',
    price: 'IDR 3,500,000',
    image: '/images/goat-icon.svg',
  },
  {
    id: 'cow',
    title: 'Cow (1/7 Share)',
    description: 'One share of a cow (1/7th of the animal)', 
    price: 'IDR 2,500,000',
    image: '/images/cow-icon.svg',
  },
  {
    id: 'camel',
    title: 'Camel (1/7 Share)',
    description: 'One share of a camel (1/7th of the animal)',
    price: 'IDR 3,000,000',
    image: '/images/camel-icon.svg',
    comingSoon: true
  },
];

const QurbanTypeStep = ({ selectedType, onSelectType }: QurbanTypeStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Qurban Type</h2>
        <p className="text-text-secondary">
          Choose the type of Qurban you'd like to perform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {qurbanTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectType(type.id)}
            disabled={type.comingSoon}
            className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
              selectedType === type.id
                ? 'border-trust bg-trust/5'
                : 'border-accent/20 hover:border-trust/50'
            } ${type.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {selectedType === type.id && (
              <div className="absolute -top-3 -right-3 bg-trust text-primary w-8 h-8 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
            )}
            
            {type.comingSoon && (
              <div className="absolute top-2 right-2 bg-accent/10 text-text-secondary text-xs px-2 py-1 rounded">
                Coming Soon
              </div>
            )}
            
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <img 
                src={type.image} 
                alt={type.title} 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-icon.svg';
                }}
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-1">{type.title}</h3>
            <p className="text-text-secondary text-sm mb-3">{type.description}</p>
            <div className="text-trust font-medium">{type.price}</div>
            
            {type.id === 'cow' && (
              <div className="mt-3 text-xs text-text-secondary">
                * Share of a cow (1 person = 1/7)
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <h4 className="font-semibold mb-2">About Qurban</h4>
        <p className="text-sm text-text-secondary">
          Qurban is an Islamic practice of sacrificing an animal for the sake of Allah during Eid al-Adha. 
          The meat is distributed to those in need, with portions for yourself, family, and the less fortunate.
        </p>
      </div>
    </div>
  );
};

export default QurbanTypeStep;
