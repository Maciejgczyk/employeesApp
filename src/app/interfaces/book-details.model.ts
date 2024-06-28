import { Book } from "./book.model";
import { Client } from "./client.model";

export interface BookDetails {
  data: Book;
  client: Client;
}
