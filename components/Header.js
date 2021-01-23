import { useRouter } from 'next/router'

import { Grid, Button, Toolbar, Avatar} from "@material-ui/core"

import { categorySchema } from "@/constant/category";




const Header = props => {
    const router = useRouter()

    const handleRouteChange = (path) => {
        router.push(path)
    }

    return (
        <Grid item xs={12}>
            <Toolbar>
                <Grid item xs={6}>
                    <Button>
                        <Avatar src="https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg" />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        {
                            categorySchema.map(item => (
                                <Button key={item.id} onClick={() => handleRouteChange(item.path)}>
                                    { item.title }
                                </Button>
                            ))
                        }
                    </div>
                </Grid>
            </Toolbar>
        </Grid>
    )
}

export default Header;
