import { 
  LightBulbIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    name: 'Project Showcase',
    description: 'Share your innovative ideas with detailed descriptions and important project links.',
    icon: LightBulbIcon,
    forProjectHolders: true,
  },
  {
    name: 'Smart Investment',
    description: 'Browse and invest in promising projects with our intuitive investment platform.',
    icon: CurrencyDollarIcon,
    forProjectHolders: false,
  },
  {
    name: 'Direct Connections',
    description: 'Connect directly with investors or project creators through our platform.',
    icon: UserGroupIcon,
    forProjectHolders: true,
  },
  {
    name: 'Performance Tracking',
    description: 'Track investments and monitor project progress in real-time.',
    icon: ChartBarIcon,
    forProjectHolders: false,
  },
  {
    name: 'Secure Transactions',
    description: 'Smart contract-based transactions ensure security and transparency.',
    icon: ShieldCheckIcon,
    forProjectHolders: true,
  },
  {
    name: 'Quick Launch',
    description: 'Streamlined process to get your project funded and launched faster.',
    icon: RocketLaunchIcon,
    forProjectHolders: true,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Accelerate Growth</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to launch your idea
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you're an innovator with the next big idea or an investor looking for opportunities,
            Idea Nest provides all the tools you need to succeed.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                  {feature.forProjectHolders && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      Creator
                    </span>
                  )}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 