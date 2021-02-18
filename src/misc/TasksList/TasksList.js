import React, { useEffect, useState } from "react";
import s from "./TasksList.module.css";
import checkIcon from "../../assets/check.svg";
import plusIcon from "../../assets/plus.svg";
import removeIcon from "../../assets/remove.svg";
import listIcon from "../../assets/list.svg";
import {
    setItemToStorage,
    getItemFromStorage,
} from "../../hooks/useLocalStorage";
import { generateRandomId } from "../../hooks/useIdGenerator";

const TasksList = (props) => {
    const parsedData = JSON.parse(getItemFromStorage("tasks"));
    const [tasks, setTasks] = useState(parsedData || []);
    const [showButtons, setShowButtons] = useState(false);
    const [activeRemoving, setActiveRemoving] = useState(false);
    console.log("tasks", tasks);

    const addItemToList = () => {
        setTasks([
            ...tasks,
            {
                id: generateRandomId() || tasks.length,
                content: "",
                isDone: false,
            },
        ]);
    };

    const removeItemFromList = (id) => {
        const items = tasks;
        const filteredItems = items.filter(function (item) {
            return item.id !== id;
        });
        setTasks(filteredItems);
    };

    const setItemDone = (id, value) => {
        let items = [...tasks];
        let item = { ...items[id] };
        item.isDone = value;
        items[id] = item;
        setTasks(items);
    };

    const setNewContent = (id, e) => {
        let items = [...tasks];
        let item = { ...items[id] };
        item.content = `${e.target.value}`;
        items[id] = item;
        setTasks(items);
    };

    useEffect(() => {
        setItemToStorage("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className={s.MainWrapper}>
            <div className={s.MainWrapperInner}>
                <div className={s.Title}>All tasks</div>
                <div className={s.List}>
                    {tasks.map((item, index) => (
                        <div className={s.ListItem} key={item.id}>
                            <div className={s.ListItemInner}>
                                <input
                                    className={s.ItemTitle}
                                    style={{
                                        color: item.isDone ? "#999" : "#000",
                                        textDecoration: item.isDone
                                            ? "line-through"
                                            : "none",
                                    }}
                                    placeholder="Tap to write..."
                                    value={item.content}
                                    onChange={(e) => setNewContent(index, e)}
                                />
                                <button
                                    className={s.ItemButton}
                                    onClick={() =>
                                        activeRemoving
                                            ? removeItemFromList(item.id)
                                            : setItemDone(index, !item.isDone)
                                    }
                                    on
                                    style={{
                                        backgroundColor: activeRemoving
                                            ? "#F03726"
                                            : item.isDone
                                            ? "#36D6B1"
                                            : "transparent",
                                    }}
                                >
                                    <img
                                        className={s.ItemButtonIcon}
                                        src={
                                            activeRemoving
                                                ? removeIcon
                                                : item.isDone
                                                ? checkIcon
                                                : null
                                        }
                                        alt={item.isDone ? "checked" : null}
                                    />
                                </button>
                                <div className={s.ItemInputMask} />
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className={s.SetButton}
                    onClick={() => setShowButtons((prev) => !prev)}
                    style={{
                        transform: showButtons ? "rotateZ(180deg)" : "none",
                    }}
                >
                    S
                    {/* <img className={s.SetButtonImg} src={plusIcon} alt="add" /> */}
                </button>
                <button
                    className={s.SetButtonSmall}
                    onClick={addItemToList}
                    style={{
                        transform: showButtons
                            ? "translate3d(0, -70px, 0)"
                            : "none",
                        // right: showButtons ? 15 : 15,
                        // bottom: showButtons ? 95 : 25,
                    }}
                >
                    <img
                        className={s.SetButtonSmallImg}
                        src={plusIcon}
                        alt="add"
                    />
                </button>
                <button
                    className={s.SetButtonSmall}
                    onClick={addItemToList}
                    style={{
                        transform: showButtons
                            ? "translate3d(-59px, -49px, 0)"
                            : "none",
                        // right: showButtons ? 74 : 0,
                        // bottom: showButtons ? 74 : 0,
                    }}
                >
                    <img
                        className={s.SetButtonSmallImg}
                        src={listIcon}
                        alt="order"
                    />
                </button>
                <button
                    className={s.SetButtonSmall}
                    onClick={() => {
                        setActiveRemoving((prev) => !prev);
                        setShowButtons(false);
                    }}
                    style={{
                        transform: showButtons
                            ? "translate3d(-85px, 10px, 0)"
                            : "none",
                        // right: showButtons ? 95 : 0,
                        // bottom: showButtons ? 15 : 0,
                    }}
                >
                    <img
                        className={s.SetButtonSmallImg}
                        src={removeIcon}
                        alt="remove"
                    />
                </button>
            </div>
        </div>
    );
};

export default TasksList;
