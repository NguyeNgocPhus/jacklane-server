import type {Resolver} from "@automapper/core";
import { Claim } from '../common/authentication/claims/claims';



export const currentUserResolver: Resolver<any, { claim: Claim }, string> = {
  resolve(source: any, {claim}): any {

    return claim;
  }
};