import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export const StickyNote = ({title, body, tags}) => {

    return <><Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p>{body}</p>
        </CardContent>
        <CardFooter>
            <p>{tags}</p>
        </CardFooter>
    </Card></>

}