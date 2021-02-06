import Card from "../../components/card/card"

export default function localViewList(props) {
    const entries = props.entries

return(
    <div>
        {entries.map((entry,index)=>{
            
            return(
                <Card key={index} blogData={entry}></Card>
            )
        })}
    </div>

)
}