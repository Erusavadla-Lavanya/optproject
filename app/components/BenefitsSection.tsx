/* components/BenefitsSection.tsx */
import { FC } from 'react'

const BenefitsSection: FC = () => {
  const benefits = [
    {
      title: 'No cost to join',
      description: 'Register and browse talent profiles, explore projects, or even book a consultation.'
    },
    {
      title: 'Post a job and hire top talent',
      description: 'Finding talent doesn’t have to be a chore. Post a job or we can search for you!'
    },
    {
      title: 'Work with the best—without breaking the bank',
      description: 'Upwork makes it affordable to up your work and take advantage of low transaction rates.'
    }
  ]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Up your work game, it’s easy
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Sign up for free
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Learn how to hire
          </button>
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection