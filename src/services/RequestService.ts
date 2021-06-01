import { professionals } from "../models/Professionals";
import { services } from "../models/Services";
import createService from "../utils/createService";

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
      const servicesDb = services.filter(
        (service) => service.client === this.id
      );
      return {
        message: "SUCCESSFUL_QUERY",
        success: true,
        data: servicesDb,
      };
    } catch (error) {
      console.log(error);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public async getRequestsByPro(): Promise<AuthReturnData> {
    try {
      const servicesDb = services.filter((service) => {
        return service.professionals.filter((pro) => pro.id === this.id);
      });
      return {
        message: "SUCCESSFUL_QUERY",
        success: true,
        data: servicesDb,
      };
    } catch (error) {
      console.log(error);
      return { message: "FATAL_SERVER_ERROR", success: false };
    }
  }

  public async addServiceByClient(): Promise<AuthReturnData> {
    try {
      const newService = createService({
        client: this.id,
        title: this.title || "",
        category: this.category || "",
        location: this.location || "",
        description: this.description || "",
      });

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
}

export default RequestService;
