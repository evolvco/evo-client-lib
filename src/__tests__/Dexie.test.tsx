import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { StoreFactory, DexieStore } from '@lib/models';
import { create, meta, model} from '@lib/models/ModelFactory';
import { FieldType, Meta, Mixin, StringEditors} from '@lib/models/ModelAdaptor.types';
import { DexieMetaModel } from '@lib/models/DexieMetaModel';
import { DexieModel } from '@lib/models/DexieModel';
import { metaSchema } from "@lib/models/metaSchema";

let metaDef: Meta = {
    name: 'sys_meta_model',
    collection: 'sys_meta_models',
    database: 'dexie_evo_meta_test',
    mixins: [Mixin.meta],
    schema: metaSchema
}

let playerDef: Meta = {
    name: 'player',
    database: 'dexie_exp_test',
    schema: {
        name:{
            type: FieldType.String,
            required: true,
            unique: true,
            _ui_:{
                editor: StringEditors['Code Editor']
            }
        },
        team:{
            type: FieldType.ObjectId,
            ref: 'team'
        },
        injured:{
            type: FieldType.Boolean
        },
        position:{
            index: true,
            type: FieldType.String,
            enum: ['QB','RB','FB','TE','WR','C','G','T']
        }
    }
}

let teamDef: Meta = {
    name: 'team',
    database: 'dexie_exp_test',
    schema: {
        name:{
            type: FieldType.String,
            required: true,
            unique: true,
        },
        city:{
            type: FieldType.String,
            required: true,
            index: true
        },
        offices:{
            type: FieldType.Array,
        },
        prospects:[{
            type: FieldType.ObjectId,
            ref: 'player',
        }]
    }
}

describe('Dexie',async ()=>{

    describe('Prepare some Dexie databases',async ()=>{

        it('Configures a database for test examples',async ()=>{
            let ds1 = new DexieStore({
                name: "dexie_exp_test"
            })
            await StoreFactory.connect(ds1)
            expect(ds1).toBeDefined()
            expect(ds1).toBeInstanceOf(DexieStore)  
        })

        it('Configures a database for test meta models',async ()=>{
            let ds2 = new DexieStore({
                name: "dexie_evo_meta_test",
            })
            await StoreFactory.connect(ds2)
            expect(ds2).toBeDefined()
            expect(ds2).toBeInstanceOf(DexieStore) 
        })

        it('should be able to be retrieved', async ()=>{
            let str1 = StoreFactory.getStore('dexie_evo_meta_test')
            expect(str1).toBeDefined()
            expect(str1).toBeInstanceOf(DexieStore)
        })

        it('should be able to be retrieved', async ()=>{
            let str2 = StoreFactory.getStore('dexie_exp_test')
            expect(str2).toBeDefined()
            expect(str2).toBeInstanceOf(DexieStore)
        })
    })

    describe('creates some Meta model types',async ()=>{

        it('must create a meta model table first to store definitions', async ()=>{
            await create(metaDef)
            let Metas = meta()
            expect(Metas).toBeDefined()
            expect(Metas).toBeInstanceOf(DexieMetaModel)
        })

        it('can now create and store a players meta models', async ()=>{
            await create(playerDef)
            let Players = model('player')
            expect(Players).toBeDefined()
            expect(Players).toBeInstanceOf(DexieModel)
        })

        it('can now create and store a teams meta models', async ()=>{
            await create(teamDef)
            let Teams = model('team')
            expect(Teams).toBeDefined()
            expect(Teams).toBeInstanceOf(DexieModel)
        })
    })

    describe('creates some Meta model records',async ()=>{

        it('create player meta model Records',async ()=>{
            let rec = await model('player').create({name:'Saquon Barkley', position:'RB', injured:false})
            expect(rec).toBeDefined()
            expect(rec).property('id')
            expect(rec).property('name').eq('Saquon Barkley')
            expect(rec).property('position').eq('RB')
            expect(rec).property('injured').eq(false)
        })

        it('create team meta model Records',async ()=>{
            let rec = await model('team').create({name:'Eagles', city:'Philly'})
            expect(rec).toBeDefined()
            expect(rec).property('id')
            expect(rec).property('name').eq('Eagles')
            expect(rec).property('city').eq('Philly')
        })

        it('create team meta model Records with a list',async ()=>{
            let rec = await model('team').create({name:'Bills', offices:['east','north'], city:'Bufalo'})
            expect(rec).toBeDefined()
            expect(rec).property('id')
            expect(rec).property('name').eq('Bills')
            expect(rec).property('offices').lengthOf(2)
        })

        it('creates many team meta model Records',async ()=>{
            let rec = await model('team').createMany([
                {name:'Bengles', offices:['east','north'], city:'Cinci'},
                {name:'Ravens', offices:['east','north'], city:'Baltimore'},
            ])
            expect(rec).toBeDefined()
            expect(rec).lengthOf(2)
            expect(rec[0]).property('name').eq('Bengles')
            expect(rec[1]).property('name').eq('Ravens')
        })

        it('creates many player meta model Records',async ()=>{
            let rec = await model('player').createMany([
                {name:'Joe', position:'RB', injured:true },
                {name:'Bob', position:'TE', injured:true },
            ])
            expect(rec).toBeDefined()
            expect(rec).lengthOf(2)
            expect(rec[0]).property('name').eq('Joe')
            expect(rec[1]).property('name').eq('Bob')
        })
        
        it('not create team meta model Records for mising REQUIRED field', async ()=>{
            async function fn() {
                return await model('team').create({city:'Reno'})
            }
            await expect(fn()).rejects.toThrow(/required/i)
        })
        
        it('not create team meta model Records for UNIQUE field', async ()=>{
            async function fn() {
                return await model('team').create({name:"Eagles", city:'Vegas'})
            }
            await expect(fn()).rejects.toThrow(/constraint/i)
        })

        it('not create player meta model Records for value not in ENUM field', async ()=>{
            async function fn() {
                return await model('player').create({name:"Joey", position:'DE'})
            }
            await expect(fn()).rejects.toThrow(/invalid/i)
        })

        it('not create player meta model Records for value not the proper TYPE field', async ()=>{
            async function fn() {
                return await model('player').create({name:"Jalen Hurts", position:'QB', injured:'kinda'})
            }
            await expect(fn()).rejects.toThrow(/type/i)
        })
    })

    describe('finds records of a model', async ()=>{

        it('find teams', async ()=>{
            let recs = await model('team').find()
            expect(recs).toBeDefined()
            expect(recs).length.greaterThan(0)
            expect(recs[0]).property('name').eq('Eagles')
        })

        it('find select fields of teams', async ()=>{
            let recs = await model('team').find({
                select:['name','id']
            })
            expect(recs).toBeDefined()
            expect(recs).length.greaterThan(0)
            expect(recs[0]).property('name').eq('Eagles')
            expect(recs[0].city).eq(undefined)
        })

        it('find teams sorting', async ()=>{
            let recs = await model('team').find({
                sort: 'name'
            })
            expect(recs).toBeDefined()
            expect(recs.length).greaterThanOrEqual(3)
            expect(recs[0]).property('name').eq('Bengles')
            expect(recs[1]).property('name').eq('Bills')
            expect(recs[2]).property('name').eq('Eagles')
        })

        it('find teams limit', async ()=>{
            let recs = await model('team').find({
                sort: 'name',
                limit: 2,
            })
            expect(recs).toBeDefined()
            expect(recs.length).eq(2)
            expect(recs[0]).property('name').eq('Bengles')
            expect(recs[1]).property('name').eq('Bills')
        })

        it('find teams page', async ()=>{
            let recs = await model('team').find({
                sort: 'name',
                limit: 2,
                skip: 2
            })
            expect(recs).toBeDefined()
            expect(recs.length).eq(2)
            expect(recs[0]).property('name').eq('Eagles')
            expect(recs[1]).property('name').eq('Eagles')
        })

        it('find teams with simple query', async ()=>{
            let recs = await model('team').find({
                where:{
                    name:'Ravens'
                }
            })

            expect(recs).toBeDefined()
            expect(recs.length).eq(1)
            expect(recs[0]).property('name').eq('Ravens')
        })

        it('find one teams with simple query', async ()=>{
            let rec = await model('team').findOne({
                where:{
                    name:'Ravens'
                }
            })
            expect(rec).toBeDefined()
            expect(rec).property('name').eq('Ravens')
        })

        it('find one teams by id', async ()=>{
            let res = await model('team').findOne({
                where:{
                    name:'Ravens'
                }
            })
            let rec = await model('team').findById(res!.id)
            expect(rec).toBeDefined()
            expect(rec).property('name').eq('Ravens')
        })
    })

    describe('updates records', async ()=>{
        it('updates a record with an id', async ()=>{
            let res = await model('team').findOne({
                where:{
                    name:'Ravens'
                }
            })
            let rec = await model('team').updateById(res!.id, {name:'Colts'})
            expect(rec).toBeDefined()
            expect(rec).property('name').eq('Colts')
        })

        it('updates a player record by id', async ()=>{
            let player = await model('player').findOne({
                where:{
                    name:'Saquon Barkley'
                }
            })
            let res = await model('player').updateById(player!.id, {
                position:'WR'
            })
            expect(res).toBeDefined()
            expect(res).property('position').eq('WR')
        })

        it('updates a record with a simple query', async ()=>{
            let res = await model('team').update({
                where:{
                    name:'Bills'
                }
            }, {
                name:'Bobcats'
            })
            expect(res).toBeDefined()
            expect(res).property('name').eq('Bobcats')
        })
    })

    describe('populate records', async ()=>{

        it('updates a player record with a team', async ()=>{
            let tm = await model('team').findOne({
                where:{
                    name:'Eagles'
                }
            })
            let res = await model('player').update({
                where:{
                    name:'Saquon Barkley'
                }}, {
                    team:tm?.id
                } )
            expect(res).toBeDefined()
            expect(res).property('team')
        })

        it('updates a team record with a list of prospects', async ()=>{
            let players = await model('player').find()
            let prospects = players.map((p)=>p.id)

            let res = await model('team').update({
                where:{
                    name:'Eagles'
                }
            },{
                prospects
            })
            expect(res).toBeDefined()
            expect(res).property('prospects').instanceOf(Array)
        })
        
        it('populate a players team record', async ()=>{
            let res = await model('player').findOne({
                where:{
                    name:'Saquon Barkley'
                },
                populate: 'team'
            })
            expect(res).toBeDefined()
            expect(res).property('team').property('id')
        })

        it('populate a team with player prospects', async ()=>{
            let res = await model('team').findOne({
                where:{
                    name:'Eagles'
                },
               populate: 'prospects'
            })
            //console.log('many to many', res)
            expect(res).toBeDefined()
            let pros = res!.prospects as Array<string>
            expect(pros[0]).property('id')
        })
    })

    describe('Removes Records', async ()=>{
       it('removes a record by id', async ()=>{
        let player = await model('player').findOne({
            where:{
                name:'Saquon Barkley'
            }
        })
        let res = await model('player').removeById(player!.id)

        let del = await model('player').findOne({
            where:{
                name:'Saquon Barkley'
            }
        })
        expect(res).toBeDefined()
        expect(res).property('position').eq('WR')
        expect(del).toBeUndefined()
       })

       it('removes a record by query', async ()=>{
        let res = await model('team').remove({
            where:{
                name:'Bobcats'
            }
        })

        let del = await model('team').findOne({
            where:{
                name:'Bobcats'
            }
        })
        expect(res).toBeDefined()
        expect(del).toBeUndefined()
       })

    })
    
})
