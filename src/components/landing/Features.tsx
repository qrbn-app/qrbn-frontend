import { ShieldCheck, Leaf, Eye, Users, Clock, Globe, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-trust" />,
      title: 'Shariah Compliant',
      description: 'All donations and investments are verified by our Shariah Council to ensure compliance with Islamic principles.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-trust" />,
      title: 'NFT Proof',
      description: 'Receive a unique NFT for every Qurban donation, providing immutable proof of your contribution.'
    },
    {
      icon: <Eye className="w-8 h-8 text-trust" />,
      title: 'Full Transparency',
      description: 'Track every transaction on the blockchain, from donation to distribution, with complete transparency.'
    },
    {
      icon: <Users className="w-8 h-8 text-trust" />,
      title: 'Community Governance',
      description: 'Participate in DAO governance to help decide how funds are allocated and used in the community.'
    },
    {
      icon: <Clock className="w-8 h-8 text-trust" />,
      title: 'Real-time Updates',
      description: 'Get real-time updates on your donations, including when and where they are being distributed.'
    },
    {
      icon: <Globe className="w-8 h-8 text-trust" />,
      title: 'Global Impact',
      description: 'Your contributions reach beneficiaries worldwide, making a difference in communities that need it most.'
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/geometric-pattern.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-trust">QRBN.app</span>
          </h2>
          <p className="text-text-secondary">
            We combine Islamic values with blockchain technology to create a transparent and trustworthy donation platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-trust/10 border border-accent/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Award className="w-10 h-10 text-trust mb-4" />
              <h3 className="text-2xl font-bold mb-2">Shariah Council Verified</h3>
              <p className="text-text-secondary max-w-2xl">
                Our platform is regularly audited by a board of Islamic scholars to ensure all transactions and investments comply with Shariah principles.
              </p>
            </div>
            <button className="px-6 py-3 bg-trust text-primary rounded-lg font-medium whitespace-nowrap hover:bg-trust/90 transition-colors">
              View Fatwa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
