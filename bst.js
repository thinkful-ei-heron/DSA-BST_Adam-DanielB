//--------------------------------------------------
// 1. Draw a BST

//     3
//  1     4
//   \     \ 
//    2     6
//         / \
//        5   9
//           /
//          7 
  
// 
//        E 
//     /     \
//   A         S 
//    \      /   \
//     E   Q       Y
//        / \     /
//       I   S   U
//        \     /
//         O   T
//        /
//       N    


//--------------------------------------------------
// 2. Remove the root

//     4
//   /   \
//  1      6
//   \    / \ 
//    2  5   9
//          / 
//         7   
//           
//           

//        I 
//     /     \
//   A         S 
//    \      /   \
//     E   Q       Y
//        / \     /
//       O   S   U
//      /       /
//     N       T


//--------------------------------------------------
// 3. Create a BST class

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left = null
        this.right = null
    }

    insert(key, value) {
        // if the tree is empty, create the root node of the tree
        if (this.key == null) {
            this.key = key
            this.value = value
        }
        // if the tree already exists, start at the root and compare it to the key. If the new key is less than the node's key, the new node will live on the left branch
        else if (key <= this.key) {
            // if the existing node does not have a left child (no left pointer) then insert the new node as the left child of that node, passing 'this' as the parent
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            // if the existing node has a left child, then recursively call the insert method so the node is added further down the tree
            else {
                this.left.insert(key, value)
            }
        }
        // if the new key is greater than the node's key, the new node will live on the right branch
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            }
            // if the existing node has a right child, then recursively call the insert method so the node is added further down the tree
            else {
                this.right.insert(key, value)
            }
        }
    }

    find(key) {
        // if the item is in the root, return that item
        if (this.key == key) {
            return this.value
        }
        // if the target item is less than the root, follow the left child. Then recursively check the left or right child until you find the item
        else if (key < this.key && this.left) {
            return this.left.find(key)
        }
        // if the target item is greater than the root, follow the right child. Then recursively check the left or right child until you find the item
        else if (key > this.key && this.right) {
            return this.right.find(key)
        }
        // if you have searched the tree and the item is not found
        else {
            throw new Error('Key Error')
        }
    }

    remove(key) {
        // once you find the target node
        if (this.key == key) {
            // if the target node has left and right children
            if (this.left && this.right) {
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            }
            // if the target node only has a left child
            else if (this.left) {
                this._replaceWith(this.left)
            }
            // if the target node only has a right child
            else if (this.right) {
                this._replaceWith(this.right)
            }
            // if the node has no children, remove it and all references to it
            else {
                this._replaceWith(null)
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key)
        }
        else if (key > this.key && this.right) {
            this.right.remove(key)
        }
        else {
            throw new Error('Key Error')
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            }
            else if (this == this.parent.right) {
                this.parent.right = node
            }
            if (node) {
                node.parent = this.parent
            }
        }
        else {
            if (node) {
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            }
            else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this
        }
        return this.left._findMin()
    }

    _findMax() {
        if (!this.right) {
            return this
        }
        return this.right._findMax()
    }
}

function main() {
    const numbersTree = new BinarySearchTree
    numbersTree.insert(3)
    numbersTree.insert(1)
    numbersTree.insert(4)
    numbersTree.insert(6)
    numbersTree.insert(9)
    numbersTree.insert(2)
    numbersTree.insert(5)
    // numbersTree.insert(7)
    const lettersTree = new BinarySearchTree
    lettersTree.insert('E')
    lettersTree.insert('A')
    lettersTree.insert('S')
    lettersTree.insert('Y')
    lettersTree.insert('Q')
    lettersTree.insert('U')
    lettersTree.insert('E')
    lettersTree.insert('S')
    lettersTree.insert('T')
    lettersTree.insert('I')
    lettersTree.insert('O')
    lettersTree.insert('N')
    const balancedTree = new BinarySearchTree
    balancedTree.insert(10)
    balancedTree.insert(15)
    balancedTree.insert(8)
    balancedTree.insert(20)
    balancedTree.insert(7)
    balancedTree.insert(14)
    balancedTree.insert(9)
    // console.log(isItBst(numbersTree))
    console.log(thirdLargest(numbersTree))
    // console.log(isItBalanced(numbersTree))
}

main()


//--------------------------------------------------
// 4. What does this program do?

// This function attempts to display a BST node's value with its left child on it's left and the right child on it's right. 


//--------------------------------------------------
// 5. Height of a BST

function findBstHeight(tree) {
    let heightRight = 0
    let heightLeft = 0
    let currNode = tree
    if (currNode.left === null && currNode.right === null) {
        if (heightLeft > heightRight) {
            return heightLeft
        }
        return heightRight
    }
    if (currNode.left) {
        heightLeft++
        heightLeft = heightLeft + findBstHeight(currNode.left)
    }
    if (currNode.right) {
        heightRight++
        heightRight = heightRight + findBstHeight(currNode.right)
    }
    if (heightLeft > heightRight) {
        return heightLeft
    }
    return heightRight
}


//--------------------------------------------------
// 6. Is it a BST?

function isItBst(tree) {
    let currNode = tree
    if (currNode === null) {
        return false
    }
    if (currNode.right && currNode.right.key < currNode.key) {
        return false
    }
    if (currNode.left && currNode.left.key > currNode.key) {
        return false
    }
    if (currNode.left) {
        return isItBst(currNode.left)
    }
    if (currNode.right) {
        return isItBst(currNode.right)
    }
    return true
}


//--------------------------------------------------
// 7. 3rd largest node

function thirdLargest(tree) {
    let largestNode = tree._findMax()
    if (largestNode.left) {
        if (largestNode.left.left) {
            return largestNode.left.left
        }
        if (!largestNode.left.left) {
            return largestNode.parent
        }
    }
    return largestNode.parent.left
}
//--------------------------------------------------
// 8. Balanced BST

function isItBalanced(tree) {
    let heightRight = 0
    let heightLeft = 0
    let currNode = tree
    if (currNode.left === null && currNode.right === null) {
        if (heightLeft > heightRight) {
            return heightLeft
        }
        return heightRight
    }
    if (currNode.left) {
        heightLeft++
        heightLeft = heightLeft + findBstHeight(currNode.left)
    }
    if (currNode.right) {
        heightRight++
        heightRight = heightRight + findBstHeight(currNode.right)
    }
    if (heightLeft >= heightRight) {
        if ((heightLeft - heightRight) > 1) {
            return false
        }
    }
    if (heightRight > heightLeft) {
        if ((heightRight - heightLeft) > 1) {
            return false
        }
    }
    return true
}


//--------------------------------------------------
// 9. Are they the same BSTs?

let arr1 = [3, 1, 5, 2, 4, 6, 0]
let arr2 = [5, 4, 6, 1, 0, 2, 3]

function areIdentical(arr1, arr2) {
    arr1Count = 0
    arr2Count = 0
    if (arr1.length !== arr2.length) {
        return false
    }
    if (arr1[0] !== arr2[0]) {
        return false
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] < arr1[i + 1]) {
            arr1Count++
        }
        if (arr1[i] > arr1[i + 1]) {
            arr1Count--
        }
        if (arr2[i] < arr2[i + 1]) {
            arr2Count++
        }
        if (arr2[i] > arr2[i + 1]) {
            arr2Count--
        }
    }
    if (arr1Count !== arr2Count) {
        return false
    }
    return true
}

console.log(areIdentical(arr1, arr2))


