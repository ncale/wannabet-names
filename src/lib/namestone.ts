import { env } from "@/env";
import { Address } from "viem";

/**
 * This is a server component and should / can not be exposed to the client.
 */

class NameStoneService {
  readonly #BASE_URL = "https://namestone.xyz/api/public_v1/";
  readonly #DOMAIN = "wannabet.eth";
  #apiKey = "";

  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  /** General purpose function for sending a GET request to namestone.xyz api */
  async #getData<T>(
    path: "get-names" | "search-names",
    queryParams: string,
    cacheTags?: string[]
  ): Promise<T> {
    const res = await fetch(
      `${this.#BASE_URL}${path}?domain=${this.#DOMAIN}&${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.#apiKey,
        },
        next: cacheTags
          ? { revalidate: 0, tags: cacheTags }
          : { revalidate: 86400 },
      }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json() as Promise<T>;
  }

  /** General purpose function for sending a POST request to namestone.xyz api */
  async #postData(
    path: "set-name" | "claim-name" | "revoke-name" | "set-domain",
    body: any
  ) {
    const res = await fetch(this.#BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.#apiKey,
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }

  /** Posts to the namestone.xyz "Set Name" route */
  async setName(name: string, address: Address, avatar?: string) {
    const body = {
      domain: this.#DOMAIN,
      name,
      address,
      text_records: avatar ? { avatar } : undefined,
    };
    return this.#postData("set-name", body);
  }

  /** Posts to the namestone.xyz "Claim Name" route */
  async claimName(name: string, address: Address, avatar?: string) {
    const body = {
      domain: this.#DOMAIN,
      name,
      address,
      text_records: avatar ? { avatar } : undefined,
    };
    return this.#postData("claim-name", body);
  }

  /** Gets a list of names */ // ! Looking into pagination
  async getNames(limit: number): Promise<NameStoneResponse> {
    const queryParams = `limit=${limit}`;
    const data = await this.#getData<NameStoneResponse>(
      "get-names",
      queryParams
    );
    return data;
  }

  /** Gets a single name matching an address */
  async getName(address: Address): Promise<NameStoneUser | null> {
    const queryParams = `address=${address}&limit=1`;
    const data = await this.#getData<NameStoneResponse>(
      "get-names",
      queryParams,
      [address]
    );
    return data[0] || null;
  }

  /** Searches names based on a string query */ // ! Looking into pagination
  async searchNames(query: string, limit: number): Promise<NameStoneResponse> {
    const queryParams = `name=${query}&limit=${limit}`;
    const data = await this.#getData<NameStoneResponse>(
      "search-names",
      queryParams,
      [query]
    );
    return data;
  }

  /** Searches a name. Throws if an exact match is not found */
  async searchName(name: string): Promise<NameStoneUser> {
    const queryParams = `name=${name}&limit=1`;
    const data = await this.#getData<NameStoneResponse>(
      "search-names",
      queryParams,
      [name]
    );
    if (data.length === 0 || data[0].name !== name) {
      throw new Error(`No user found matching name: ${name}`);
    }
    return data[0];
  }

  async isNameTaken(name: string): Promise<boolean> {
    try {
      await this.searchName(name);
      return true;
    } catch (error) {
      return false;
    }
  }

  /** Revokes a name */
  async revokeName(name: string) {
    const body = {
      domain: this.#DOMAIN,
      name,
    };
    return await this.#postData("revoke-name", body);
  }
}

type NameStoneResponse = NameStoneUser[];

type NameStoneUser = {
  name: string;
  address: Address;
  domain: string; // ens name
  text_records?: {
    avatar?: string; // url
  };
};

const nameStoneService = new NameStoneService(env.NAMESTONE_API_KEY);

export {
  nameStoneService,
  NameStoneService,
  type NameStoneUser,
  type NameStoneResponse,
};
