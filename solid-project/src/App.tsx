import { Component, createSignal, onMount, Show } from "solid-js";
import _ from 'lodash';

import styles from "./App.module.css";
import List from "./components/List/List";

const App: Component = () => {
  const [originalList, setOriginalList] = createSignal([]);
  const [currentList, setCurrentList] = createSignal([]);
  const [showedElements, setShowedElements] = createSignal(0);
  
  onMount(async() => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    setOriginalList(await res.json());
    setCurrentList(originalList());
    setShowedElements(originalList().length)
  })

  const onChangeText = _.debounce( (e) => {
    const text = e.target.value;
    setCurrentList(() => originalList().filter((singleElement) => singleElement.title.includes(text)))
    setShowedElements(currentList().length);
  }, 500);

  return (
    <div class={styles.App}>
      <h1>Collection of posts</h1>
      <input type='text' onkeyup={(e) => onChangeText(e)} class={styles.input} placeholder="Search by title..."/>
      <Show
        when={showedElements() === originalList().length}
        fallback={<p>Showing {showedElements()} out of {originalList().length} posts</p>}
      >
        <p></p>
      </Show>
      <List list={currentList()}/>
    </div>
  );
};

export default App;
