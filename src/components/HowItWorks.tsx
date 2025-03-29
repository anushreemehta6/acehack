import { 
  DocumentTextIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Step } from '@/types';

const steps: Step[] = [
  {
    name: 'Create Your Profile',
    description: 'Sign up as a project holder or investor and create your detailed profile.',
    icon: UserGroupIcon,
  },
  {
    name: 'List Your Project',
    description: 'Project holders can showcase their ideas with detailed descriptions and funding requirements.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Connect & Invest',
    description: 'Investors can browse projects and make investments through our secure platform.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Track Progress',
    description: 'Monitor your investments or project growth through our intuitive dashboard.',
    icon: CheckCircleIcon,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Simple Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Idea Nest Works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes it easy to connect innovative projects with interested investors.
            Follow these simple steps to get started.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-indigo-600">Step {index + 1}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="font-semibold text-gray-900">{step.name}</p>
                  <p className="mt-2 flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 