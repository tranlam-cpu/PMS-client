import { createReducer, on } from "@ngrx/store";
import { categorysAdapter, initialState } from "./category.state";
import { createCategorySuccess, deleteCategorySuccess, deleteManyCategorySuccess, getAllCategorySuccess, updateCategorySuccess } from "./category.actions";




const _CategoryReducer=createReducer(
    initialState,
    on(getAllCategorySuccess,(state:any,action:any)=>{
        return categorysAdapter.setAll(action.category,state)
        // return{
        //     ...state,
        //     category: action.category
        // }
    }),
    on(createCategorySuccess,(state:any,action:any)=>{
        return categorysAdapter.addOne(action.category,state)
        // return{
        //     ...state,
        //     category: [...state.category, action.category]
        // }
    }),
    on(deleteCategorySuccess,(state:any,action:any)=>{
        
        return categorysAdapter.removeOne(action.category.id,state)
        // return{
        //     ...state,
        //     category: state.category.filter((category:Category)=>category.id!==action.category.id)
        // }
    }),
    on(updateCategorySuccess,(state:any,action:any)=>{
        return categorysAdapter.updateOne(action.category,state)
        // return{
        //     ...state,
        //     category: state.category.map((category:Category)=>category.id===action.category.id?action.category:category)
        // }
    }),
    on(deleteManyCategorySuccess,(state:any,action:any)=>{
        return categorysAdapter.removeMany(action.ids,state)
        // return{
        //     ...state,
        //     category: state.category.filter((category:Category)=>!action.ids.includes(category.id))
        // }
    })
)


export function CategoryReducer(state:any,action:any){
    return _CategoryReducer(state,action);
}