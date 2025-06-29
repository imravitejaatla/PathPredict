import { Clock, Bus, PoundSterlingIcon as Pound, MapPin } from "lucide-react"
import type { BusService } from "./open-route-service"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface BusServiceInfoProps {
  services: BusService[]
}

export function BusServiceInfo({ services }: BusServiceInfoProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-800">
      <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-3 flex items-center">
        <Bus className="h-4 w-4 mr-2 text-blue-600" />
        Available Bus Services
      </h3>

      <Accordion type="single" collapsible className="w-full">
        {services.map((service, index) => (
          <AccordionItem key={index} value={`service-${index}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center">
                  <div
                    className={`h-8 w-12 rounded flex items-center justify-center font-bold text-white ${
                      service.routeNumber === "103" ? "bg-red-600" : "bg-blue-600"
                    }`}
                  >
                    {service.routeNumber}
                  </div>
                  <span className="ml-3 text-sm font-medium">{service.operator}</span>
                </div>
                <div className="text-sm text-gray-500">{service.duration}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2 pb-1">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-200">Frequency</p>
                      <p className="text-gray-500 dark:text-gray-400">{service.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-200">Service Hours</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {service.firstBus} - {service.lastBus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Pound className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-200">Fare</p>
                    <p className="text-gray-500 dark:text-gray-400">{service.fare}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-200">Stops</p>
                    <div className="relative pl-4 mt-1 border-l-2 border-dashed border-gray-300">
                      {service.stops.map((stop, stopIndex) => (
                        <div key={stopIndex} className="mb-2 relative">
                          <div className="absolute -left-[17px] top-1 w-3 h-3 rounded-full bg-white border-2 border-blue-500"></div>
                          <p className="text-gray-600 dark:text-gray-300">{stop}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {service.routeNumber === "103" && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm text-blue-800 dark:text-blue-100 mt-2">
                    <p className="font-medium">School Express Service</p>
                    <p className="dark:text-blue-200">
                      This is a dedicated school service with limited stops and faster journey times. Valid student ID
                      required.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
