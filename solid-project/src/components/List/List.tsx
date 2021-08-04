import { Component, For } from "solid-js";
import styles from "./List.module.css";

interface ListProps{
    list: any;
}

const List: Component<ListProps> = (props) => {
    return(
        <div class={styles.container}>
            <For each={props.list}>{singleElement => 
                <div style={{ padding: "20px 10px", margin: "20px 0px" ,"background-color": "#fefefe" }}>
                    <h2>
                        {singleElement.title}
                    </h2>
                    <p>
                        {singleElement.body}
                    </p>
                </div>
            }
            </For>
        </div>
    );
}

export default List;
