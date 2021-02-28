import {Object,Property} from 'fabric-contract-api'
@Object()
export class Permission{
    @Property()
    public ID:string
    @Property()
    public P_ID:string 
    @Property()
    public R_ID:string
    @Property()
    public D_ID:string
    @Property()
    public Timestamp:string
    @Property()
    public StatusOfRequest:string
    @Property()
    public Organization:string
    @Property()
    public RequestedTime:string
}