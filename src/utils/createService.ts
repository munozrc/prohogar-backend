import { professionals } from "../models/Professionals";
import { v4 as uuidv4 } from "uuid";
import { ProfessionalModel, ServiceModel } from "../typings";
import { services } from "../models/Services";
import { users } from "../models/Users";

export default function createService(service: ServiceModel): ServiceModel {
  const listProfessionals = professionals
    .filter((pro) => pro.category === service.category)
    .map((pro) => {
      const user = users.find((u) => u.id === pro.id);
      const object: ProfessionalModel = {
        id: pro.id,
        name: user?.name || "",
        photo: user?.photo || "",
        acceptRequest: false,
      };
      return object;
    });

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
