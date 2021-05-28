import { services } from "../models/Services";

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

  public async getServices(): Promise<AuthReturnData> {
    try {
      const servicesDb = services.filter((service) => service.id === this.id);
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

  // public async createSercice(): Promise<AuthReturnData> {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //     return { message: "FATAL_SERVER_ERROR", success: false };
  //   }
  // }
}

export default RequestService;
