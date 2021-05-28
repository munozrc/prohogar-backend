import { professionals } from "../models/Professionals";
import { v4 as uuidv4 } from "uuid";
import { ServiceModel } from "../typings";
import { services } from "../models/Services";

export default function createService(service: ServiceModel): ServiceModel {
  const listProfessionals = professionals
    .filter((pro) => pro.category === service.category)
    .map((pro) => pro.id);

  const newService = {
    id: uuidv4(),
    client: service.client,
    state: 0,
    title: service.title,
    category: service.category,
    location: service.location,
    description: service.description,
    date: new Date().toISOString(),
    professionals: listProfessionals,
    professional: null,
  };

  services.push(newService);
  return service;
}