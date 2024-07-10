export class UpdateResponse {
  generatedMaps: Array<any>;
  raw: Array<any>;
  affected: number;

  constructor(response: UpdateResponse) {
    this.generatedMaps = response.generatedMaps;
    this.raw = response.raw;
    this.affected = response.affected;
  }
}

export class DeleteResponse {
  raw: Array<any>;
  affected: number;

  constructor(response: DeleteResponse) {
    this.raw = response.raw;
    this.affected = response.affected;
  }
}
