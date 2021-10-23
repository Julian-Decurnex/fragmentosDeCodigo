function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null
  }
  
  function BST(value) {
    this.root = new Node(value)
    this.count = 1
    
    this.size = function() {
      return this.count
    }
    
    this.insert = function(value) {
      this.count++
      let newNode = new Node(value)
      
      const searchTree = function(node) {
        if(value < node.value) {
          if(!node.left) {
            node.left = newNode
          } else {
            searchTree(node.left)
          }
        }
        else if(value > node.value) {
          if(!node.right) {
            node.right = newNode
          } else {
            searchTree(node.right)
          }
        }
      }
      searchTree(this.root)
    }
    
    this.min = function() {
      let currentNode = this.root
      while(currentNode.left) {
        currentNode = currentNode.left
      }
      return currentNode.value
    }
    
    this.max = function() {
      let currentNode = this.root
      while(currentNode.right) {
        currentNode = currentNode.right
      }
      return currentNode.value
    }
    
    this.contains = function(value) {
      let currentNode = this.root
      while(currentNode) {
        if(value === currentNode.value) {
          return true
        }
        if(value < currentNode.value) {
          currentNode = currentNode.left
        } else {
          currentNode = currentNode.right
        }
      }
      return false
    }
    
    this.height = function() {
      let currentNode = this.root
      
      const getHeight = function(node) {
        let currentNode = node
        if(currentNode == null) {
          return 0
        }
        else {
          var leftDepth = getHeight(currentNode.left)
          var rightDepth = getHeight(currentNode.right)
        }
        if(leftDepth > rightDepth) {
          return (leftDepth+1)
        } else return (rightDepth+1)
      }
      return getHeight(currentNode)
    }
    
    this.balanced = function(){
      let currentNode = this.root
      
      const getHeight = function(node) {
        let currentNode = node
        if(currentNode == null) {
          return 0
        }
        else {
          var leftDepth = getHeight(currentNode.left)
          var rightDepth = getHeight(currentNode.right)
        }
        if(leftDepth > rightDepth) {
          return (leftDepth+1)
        } else return (rightDepth+1)
      }
      
      const isBalanced = function(node) {
        let leftHeight;
        let rightHeight;
        let currentNode = node;
        if(currentNode === null) return 1
        leftHeight = getHeight(currentNode.left)
        rightHeight = getHeight(currentNode.right)
        if(Math.abs(leftHeight-rightHeight) <= 1 
                    && isBalanced(currentNode.left)
                    && isBalanced(currentNode.right)) {
          return true
        }
        return false
      }
      
      return isBalanced(currentNode)
    }
    
    // DEPTH FIRST SEARCH
    
    //IN-ORDER (left, root, right)
    this.dfsInOrder = function(){
      let result = []
      const traverse = function(node) {
        if(node.left) traverse(node.left)
        result.push(node.value)
        if(node.right) traverse(node.right)
      }
      traverse(this.root)
      return result
    }
    //PRE-ORDER (root, left, right)
    this.dfsPreOrder = function() {
      let result = []
      const traverse = function(node) {
        result.push(node.value)
        if(node.left) traverse(node.left)
        if(node.right) traverse(node.right)
      }
      traverse(this.root)
      return result
    }
    //POST-ORDER (left, right, root)
    this.dfsPostOrder = function() {
      let result = []
      const traverse = function(node) {
        if(node.left) traverse(node.left)
        if(node.right) traverse(node.right)
        result.push(node.value)
      }
      traverse(this.root)
      return result
    }
    
    //BREADTH FIRST SEARCH
    this.bfs = function() {
      let result = []
      let queue = []
      queue.push(this.root)
      while(queue.length) {
        let currentNode = queue.shift()
        result.push(currentNode.value)
        if(currentNode.left) {
          queue.push(currentNode.left)
        } 
        if(currentNode.right) {
          queue.push(currentNode.right)
        }
      }
      return result
    }
  }

let tree = new BST(15)

tree.insert(3)
tree.insert(36)
tree.insert(2)
tree.insert(12)
tree.insert(28)
tree.insert(39)

console.log(tree)

console.log(tree.size(), 'size test', 7, 'correct')
console.log(tree.min(), 'min test', 2, 'correct')
console.log(tree.max(), 'max test', 39, 'correct')
console.log(tree.contains(36), 'contains test', true, 'correct')
console.log(tree.contains(17), 'contains test', false, 'correct')
console.log(tree.height(), 'height test', 3, 'correct')
console.log(tree.balanced(), 'isBalanced test', true, 'correct')
console.log(tree.dfsInOrder(), 'dfsInOrder test', [2, 3, 12, 15, 28, 36, 39], 'correct')
console.log(tree.dfsPreOrder(), 'dfsPreOrder test', [15,3,2,12,36,28,39], 'correct')
console.log(tree.dfsPostOrder(), 'dfsPostOrder test', [2,12,3,28,39,36,15], 'correct')
console.log(tree.bfs(), 'bfs test', [15,3,36,2,12,28,39], 'correct')
  
// SI USAS ESTO ATENTO A LOS THIS.ROOT, EN HENRY TUVE QUE PONER THIS NOMAS PORQUE EL TREE NO TENIA UN THIS.ROOT