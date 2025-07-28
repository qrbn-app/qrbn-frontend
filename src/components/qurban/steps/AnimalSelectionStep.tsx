import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  age: string;
  image: string;
  benefits: string[];
}

interface AnimalSelectionStepProps {
  qurbanType: string;
  selectedAnimal: Animal | null;
  onSelectAnimal: (animal: Animal) => void;
}

const getAnimalsByType = (type: string): Animal[] => {
  if (type === 'goat') {
    return [
      {
        id: 'goat-premium',
        name: 'Premium Goat',
        description: 'Healthy, well-fed goat meeting Islamic requirements',
        price: 3500000,
        weight: '20-25 kg',
        age: '1-2 years',
        image: '/images/goat-premium.jpg',
        benefits: [
          'Meets all Islamic requirements',
          'Premium feed and care',
          'Health certificate included',
          'Free delivery to beneficiaries'
        ]
      },
      {
        id: 'goat-standard',
        name: 'Standard Goat',
        description: 'Good quality goat for Qurban',
        price: 2800000,
        weight: '18-22 kg',
        age: '1-2 years',
        image: '/images/goat-standard.jpg',
        benefits: [
          'Meets Islamic requirements',
          'Healthy and well-fed',
          'Basic health check',
          'Free delivery to beneficiaries'
        ]
      }
    ];
  } else if (type === 'cow') {
    return [
      {
        id: 'cow-premium',
        name: 'Premium Cow (1/7 Share)',
        description: 'High-quality cow share with premium care',
        price: 3000000,
        weight: '150-180 kg',
        age: '2-3 years',
        image: '/images/cow-premium.jpg',
        benefits: [
          'Premium feed and care',
          'Health certificate included',
          'Distributed to 7 families',
          'Priority distribution'
        ]
      },
      {
        id: 'cow-standard',
        name: 'Standard Cow (1/7 Share)',
        description: 'Good quality cow share for Qurban',
        price: 2500000,
        weight: '130-160 kg',
        age: '2-3 years',
        image: '/images/cow-standard.jpg',
        benefits: [
          'Meets Islamic requirements',
          'Healthy and well-fed',
          'Basic health check',
          'Distributed to 7 families'
        ]
      }
    ];
  }
  return [];
};

const AnimalSelectionStep = ({ qurbanType, selectedAnimal, onSelectAnimal }: AnimalSelectionStepProps) => {
  const animals = getAnimalsByType(qurbanType);

  if (!qurbanType) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Please select a Qurban type first</h3>
        <p className="text-text-secondary">Go back to the previous step to choose a Qurban type</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Your Animal</h2>
        <p className="text-text-secondary">
          Choose the animal for your Qurban. All animals meet Islamic requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {animals.map((animal) => (
          <motion.div
            key={animal.id}
            whileHover={{ y: -5 }}
            className={`relative rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              selectedAnimal?.id === animal.id
                ? 'border-trust ring-2 ring-trust/20'
                : 'border-accent/20 hover:border-trust/50'
            }`}
          >
            <div 
              className="cursor-pointer"
              onClick={() => onSelectAnimal(animal)}
            >
              <div className="h-48 bg-accent/10 overflow-hidden">
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-animal.jpg';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{animal.name}</h3>
                    <p className="text-text-secondary text-sm">{animal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-trust font-bold text-xl">
                      IDR {animal.price.toLocaleString('id-ID')}
                    </div>
                    {qurbanType === 'cow' && (
                      <div className="text-xs text-text-secondary">1/7 share</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="bg-accent/5 p-2 rounded">
                    <div className="text-text-secondary text-xs">Weight</div>
                    <div className="font-medium">{animal.weight}</div>
                  </div>
                  <div className="bg-accent/5 p-2 rounded">
                    <div className="text-text-secondary text-xs">Age</div>
                    <div className="font-medium">{animal.age}</div>
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  {animal.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-trust mt-0.5 mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnimal?.id === animal.id 
                  ? 'bg-trust border-trust' 
                  : 'bg-primary border-accent/30'
              }`}>
                {selectedAnimal?.id === animal.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-trust mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-1">About Animal Selection</h4>
            <p className="text-sm text-text-secondary">
              All our animals are raised with care and meet Islamic requirements for Qurban. 
              They are healthy, well-fed, and treated humanely. The Qurban will be performed 
              according to Islamic guidelines by trained professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalSelectionStep;
