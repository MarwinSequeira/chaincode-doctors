import { Contract, Transaction, Context } from "fabric-contract-api";
import { Permission } from "./assets";

type operation = "insert" | "delete" | "update";
export class PermissionContract extends Contract {
  public async InitLedger(ctx: Context) {
    let permissions: Permission[] = [
      {
        ID: "perm1",
        P_ID: "123",
        R_ID: [],
        D_ID: "123",
        Timestamp: "eded",
        StatusOfRequest: "Allowed",
        Organization: "OrgA",
        RequestedTime: "dkded",
      },
      {
        ID: "perm2",
        P_ID: "123",
        R_ID: [],
        D_ID: "123",
        Timestamp: "eded",
        StatusOfRequest: "Allowed",
        Organization: "OrgA",
        RequestedTime: "dkded",
      },
      {
        ID: "perm3",
        P_ID: "123",
        R_ID: [],
        D_ID: "123",
        Timestamp: "eded",
        StatusOfRequest: "Allowed",
        Organization: "OrgA",
        RequestedTime: "dkded",
      },
    ];
    for (const permission of permissions) {
      await ctx.stub.putState(
        permission.ID,
        Buffer.from(JSON.stringify(permission))
      );
      console.info(`permission ${permission.ID} initialized`);
    }
  }
  public async CreatePermission(
    ctx: Context,
    id: string,
    P_ID: string,
    R_ID: string[],
    D_ID: string,
    Timestamp: string,
    StatusOfRequest: string,
    Organization: string,
    RequestedTime: string
  ) {
    let permission: Permission = {
      ID: id,
      P_ID,
      R_ID,
      D_ID,
      Timestamp,
      StatusOfRequest,
      Organization,
      RequestedTime,
    };
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(permission)));
  }

  public async ReadPermission(ctx: Context, id: string) {
    let permission = await ctx.stub.getState(id);
    return permission.toString();
  }

  public async ModifyPermission(
    ctx: Context,
    operation: operation,
    id: string,
    reports: string[]
  ) {
    let permission_buffer = await ctx.stub.getState(id);
    let permission: Permission = JSON.parse(permission_buffer.toString());
    let reports_array = permission.R_ID;
    switch (operation) {
      case "insert": {
        for (const report of reports) {
          reports_array.push(report);
        }
        break;
      }
      case "delete": {
        for(const report of reports){

        }
        break;
      }
      case "update": {
        break;
      }
      default: {
        return "Incorrect Operation";
      }
    }
    permission.R_ID = reports_array;
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(permission)));
  }
}
