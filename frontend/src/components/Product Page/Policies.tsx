import { policyProps } from "@/containers/ProductContainer"
import {Icon} from "@iconify/react"

export default function Policies({policies}:{policies:policyProps[]}){
    return(
        <section className="grid grid-cols-3 gap-4 w-full h-32 text-white mt-8">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl h-full hover:scale-105 hover:shadow-lg transition-transform px-3"
          >
            <Icon className="w-8 h-8" icon={policy.icon} />
            <p className="text-semibold text-center mt-2">{policy.title}</p>
          </div>
        ))}
      </section>
    )
}