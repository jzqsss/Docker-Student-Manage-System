






import request from "superagent";

export class LabClient {
  static async ls(
    lab: string
  ): Promise<{ 
    out: string;
   }> {
    let url = "https://localhost:8080/ls";

    let response = await request.post(url).type("form").send({
      lab: lab,
    });

    return response.body ?? response.text;
  }

  static async start(
    lab: string,
    image: string,
  ): Promise<{ 
    out: string;
   }> {
    let url = "https://localhost:8080/start";

    let response = await request.post(url).type("form").send({
      lab: lab,
      image: image,
    });

    return response.body ?? response.text;
  }

  static async stop(
    lab: string
  ): Promise<{ 
    out: string;
   }> {
    let url = "https://localhost:8080/stop";

    let response = await request.post(url).type("form").send({
      lab: lab,
    });

    return response.body ?? response.text;
  }
}
