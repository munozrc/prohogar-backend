import { services } from "../models/Services";
import createService from "../utils/createService";

interface AuthReturnData {
  message: string;
  success: boolean;
  data?: object;
}

class RequestService {
  constructor(
    public readonly client: string,
    public readonly title?: string,
    public readonly category?: string,
    public readonly location?: string,
    public readonly description?: string
  ) {}

  public async getServices(): Promise<AuthReturnData> {
    try {
      const servicesDb = services.filter(
        (service) => service.client === this.client
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

  public async addSercice(): Promise<AuthReturnData> {
    try {
      const newService = createService({
        client: this.client,
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
