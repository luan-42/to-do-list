function Database() {
    let id = localStorage.getItem("id");
    if (id === null) {
        localStorage.setItem("id", 0);
    }
    id = +id;

    const add = (item) => {
        localStorage.setItem(id, JSON.stringify(item));
        localStorage.setItem("id", ++id);
    }

    const load = () => {
        const items = [];
        for (let i = 0; i < id; i++) {
            try {
                const item = JSON.parse(localStorage.getItem(i));
                if (item !== null) {
                    item.id = i;
                    items.push(item);
                }
            } catch (error) {
                console.error(`Error loading item with id ${i}:`, error);
            }
        }
        return items;
    }

    const update = (id, item) => {
        localStorage.setItem(id, JSON.stringify(item));
    }

    const remove = (id) => {
        localStorage.removeItem(id);
    }

    return {add, load, update, remove};
}

export default Database();