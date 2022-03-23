/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const tagElm = document.createElement(tag);
        const text = document.createTextNode(content);
        tagElm.appendChild(text);
        document.body.prepend(tagElm);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function addChild(count, depth) {
        let root = document.createElement('div');
        root.classList = `item_${depth}`;
        if (depth < level) {
            for (let i = 0; i < count; i++) {
                root.appendChild(addChild(childrenCount, depth + 1));
            }
        }
        return root;
    }

    return addChild(childrenCount, 1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    function addChild(depth) {
        let root = document.createElement('div');
        root.classList = `item_${depth}`;
        if (depth < 3) {
            for (let i = 0; i < 2; i++) {
                root.appendChild(addChild(depth + 1));
            }
        }
        return root;
    }
    let tree = addChild(1);
    tree.childNodes.forEach((element) => {
        if (element.className == 'item_2') {
            let children = element.childNodes;
            let section = document.createElement('SECTION');
            section.classList.add('item_2');
            children.forEach((child) => {
                section.appendChild(child);
            });
            element.replaceWith(section);
        }
        console.log(element.outerHTML);
    });
    return tree;
}
