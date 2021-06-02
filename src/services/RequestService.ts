import { v4 as uuidv4 } from "uuid";
import { ProfessionalModel, ServiceModel } from "../typings";
import { services } from "../models/Services";
import { users } from "../models/Users";
import { professionals } from "../models/Professionals";

interface AuthReturnData {
  message: string;
  success: boolean;
  data?: object;
}

class RequestService {
  constructor(
    public readonly id: string,
    public readonly title?: string,
    public readonly category?: string,
    public readonly location?: string,
    public readonly description?: string
  ) {}

  public async getServicesByClient(): Promise<AuthReturnData> {
    try {
      const listServices = services
        .filter((service) => service.client === this.id)
        .map(this.normalizeService)
        .reverse();

      return {
        message: "SUCCESSFUL_QUERY",
        success: true,
        data: listServices,
      };
    } catch (error) {
      console.log(error);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public async getRequestsByPro(): Promise<AuthReturnData> {
    try {
      const listServices = services
        .filter((service) => {
          return service.professionals.filter((pro) => pro.id === this.id);
        })
        .map(this.normalizeService)
        .reverse();

      return {
        message: "SUCCESSFUL_QUERY",
        success: true,
        data: listServices,
      };
    } catch (error) {
      console.log(error);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public async addServiceByClient(): Promise<AuthReturnData> {
    try {
      const clientFind = users.find((user) => user.id === this.id);
      const listProfessionals = professionals
        .filter((pro) => pro.category === this.category)
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

      const normalizeOffers = (professional: ProfessionalModel) => {
        return {
          id: professional.id,
          acceptRequest: professional.acceptRequest,
        };
      };

      const normalizeNewService = {
        id: uuidv4(),
        client: this.id,
        state: 0,
        title: this.title || "",
        category: this.category || "",
        location: this.location || "",
        description: this.description || "",
        date: new Date().toISOString(),
        professionals: listProfessionals.map(normalizeOffers),
        professional: null,
      };

      const newService = {
        ...normalizeNewService,
        client: {
          id: clientFind?.id,
          name: clientFind?.name,
          photo: clientFind?.photo,
        },
        professionals: listProfessionals,
      };

      services.push(normalizeNewService);

      return {
        message: "SERVICE_CREATED",
        success: true,
        data: newService,
      };
    } catch (e) {
      console.log(e);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public static async getAvailableCategories(): Promise<AuthReturnData> {
    try {
      let categories: { [key: string]: number } = {};
      professionals.forEach((pro) => {
        const current = pro.category;
        if (current in categories) ++categories[current];
        else categories[current] = 1;
      });

      return {
        message: "SUCCESSFUL_QUERY",
        success: true,
        data: categories,
      };
    } catch (e) {
      console.log(e);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  private normalizeService(service: ServiceModel): object {
    const clientFind = users.find((user) => user.id === service.client);
    const listProfessionals = service.professionals || [];

    const normalizeProfessionals: Array<ProfessionalModel> =
      listProfessionals.map((pro: ProfessionalModel) => {
        const userFind = users.find((user) => user.id === pro.id);
        return {
          id: pro.id,
          name: userFind?.name,
          photo: userFind?.photo,
          acceptRequest: pro.acceptRequest,
        };
      });

    return {
      ...service,
      client: {
        id: clientFind?.id,
        name: clientFind?.name,
        photo: clientFind?.photo,
      },
      professionals: normalizeProfessionals,
    };
  }
}

export default RequestService;
