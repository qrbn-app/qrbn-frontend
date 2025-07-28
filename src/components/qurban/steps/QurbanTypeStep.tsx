import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

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
        <h2 className="text-3xl font-bold mb-3 text-foreground">Select Qurban Type</h2>
        <p className="text-lg text-text-secondary">
          Choose the type of Qurban you'd like to perform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {qurbanTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectType(type.id)}
            disabled={type.comingSoon}
            className={`relative p-8 rounded-xl border-2 text-left transition-all duration-300 ${
              selectedType === type.id
                ? 'border-trust bg-trust/5 shadow-lg shadow-trust/10'
                : 'border-accent/20 hover:border-trust/50 bg-primary/30 backdrop-blur-sm'
            } ${type.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
            aria-label={`Select ${type.title} for ${type.price}`}
          >
            {selectedType === type.id && (
              <div className="absolute -top-3 -right-3 bg-trust text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-5 h-5" />
              </div>
            )}
            
            {type.comingSoon && (
              <div className="absolute top-3 right-3 bg-accent/20 text-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                Coming Soon
              </div>
            )}
            
            <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <img 
                src={type.image} 
                alt="" 
                role="presentation"
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-icon.svg';
                }}
              />
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-foreground">{type.title}</h3>
            <p className="text-text-secondary mb-4">{type.description}</p>
            <div className="text-2xl font-bold text-trust mb-2">{type.price}</div>
            
            {type.id === 'cow' && (
              <div className="mt-3 text-sm text-text-secondary bg-accent/5 p-2 rounded-lg">
                * Share of a cow (1 person = 1/7)
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-12 p-6 bg-accent/5 rounded-xl border border-accent/10 backdrop-blur-sm">
        <div className="flex items-start">
          <div className="bg-trust/10 p-3 rounded-lg mr-4">
            <Info className="w-6 h-6 text-trust" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground mb-2">About Qurban</h4>
            <p className="text-text-secondary">
              Qurban is an Islamic practice of sacrificing an animal for the sake of Allah during Eid al-Adha. 
              The meat is distributed to those in need, with portions for yourself, family, and the less fortunate.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-trust/10 text-trust">
                Sunnah of Prophet Ibrahim
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-trust/10 text-trust">
                Eid al-Adha Ritual
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QurbanTypeStep;
