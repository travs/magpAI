export class BirdCard {
  commonName: string;
  set: string;
  color: string;
  powerText: string;
  predator: boolean;
  flocking: boolean;
  victoryPoints: number;
  nestType: string;
  eggLimit: number;
  wingspan: number;
  forest: boolean;
  grassland: boolean;
  wetland: boolean;
  invertebrate: number;
  seed: number;
  fish: number;
  fruit: number;
  rodent: number;
  wild: number;
  slashFoodCost: boolean;
  starFoodCost: boolean;
  totalFoodCost: number;

  constructor(data: any) {
    // Check if the data has the raw keys or JSON keys and map accordingly
    this.commonName = data["Common name"] || data["commonName"];
    this.set = data["Set"] || data["set"];
    this.color = data["Color"] || data["color"];
    this.powerText = data["Power text"] || data["powerText"];
    this.predator = data["Predator"] === "X" || data["predator"] || false;
    this.flocking = data["Flocking"] === "X" || data["flocking"] || false;
    this.victoryPoints = parseInt(
      data["Victory points"] || data["victoryPoints"],
      10
    );
    this.nestType = data["Nest type"] || data["nestType"];
    this.eggLimit = parseInt(data["Egg limit"] || data["eggLimit"], 10);
    this.wingspan = parseInt(data["Wingspan"] || data["wingspan"], 10);
    this.forest = data["Forest"] === "X" || data["forest"] || false;
    this.grassland = data["Grassland"] === "X" || data["grassland"] || false;
    this.wetland = data["Wetland"] === "X" || data["wetland"] || false;
    this.invertebrate = parseInt(
      data["Invertebrate"] || data["invertebrate"] || "0",
      10
    );
    this.seed = parseInt(data["Seed"] || data["seed"] || "0", 10);
    this.fish = parseInt(data["Fish"] || data["fish"] || "0", 10);
    this.fruit = parseInt(data["Fruit"] || data["fruit"] || "0", 10);
    this.rodent = parseInt(data["Rodent"] || data["rodent"] || "0", 10);
    this.wild = parseInt(data["Wild (food)"] || data["wild"] || "0", 10);
    this.slashFoodCost =
      data["/ (food cost)"] === "X" || data["slashFoodCost"] || false;
    this.starFoodCost =
      data["* (food cost)"] === "X" || data["starFoodCost"] || false;
    this.totalFoodCost = parseInt(
      data["Total food cost"] || data["totalFoodCost"],
      10
    );
  }
}
