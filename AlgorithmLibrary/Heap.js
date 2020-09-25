
function Heap(am)
{
	this.init(am);

}

Heap.prototype = new Algorithm();
Heap.prototype.constructor = Heap;
Heap.superclass = Algorithm.prototype;



var ARRAY_SIZE  = 32;
var ARRAY_ELEM_WIDTH = 30;
var ARRAY_ELEM_HEIGHT = 25;
var ARRAY_INITIAL_X = 30;

var ARRAY_Y_POS = 50;
var ARRAY_LABEL_Y_POS = 70;


Heap.prototype.init = function(am)
{
	var sc = Heap.superclass;
	var fn = sc.init;
	fn.call(this,am);
	this.addControls();
	this.changeToMinHeap();
	this.nextIndex = 0;
	this.HeapXPositions = [0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600,
					  700, 800, 075, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 
					  625, 675, 725, 775, 825];

	this.HeapYPositions = [0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310,
					  310, 310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 
					  380, 380, 380, 380, 380];

	for(var i = 0; i < ARRAY_SIZE; i++){
		this.HeapYPositions[i] += 40;
	}

	this.commands = [];
	this.createArray();
}

Heap.prototype.addControls =  function()
{
	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertButton = addControlToAlgorithmBar("Button", "Insert");

	this.insertPriorityField = addControlToAlgorithmBar("Text", "");

	this.removeSmallestButton = addControlToAlgorithmBar("Button", "Remove Root");
	this.clearHeapButton = addControlToAlgorithmBar("Button", "Clear Heap");
	this.buildHeapButton = addControlToAlgorithmBar("Button", "Random Heap");

	this.changeHeapButton = addControlToAlgorithmBar("Button", "Change to MaxHeap");
}

Heap.prototype.changeToMinHeap = function()
{
	this.insertField.onkeydown = this.returnSubmit(this.insertField, this.insertCallback.bind(this), 4, true);
	this.insertButton.onclick = this.insertCallback.bind(this);

	this.insertPriorityField.onkeydown = this.returnSubmit(this.insertPriorityField, this.insertCallback.bind(this), 4, true);

	this.removeSmallestButton.onclick = this.removeSmallestCallback.bind(this);
	this.clearHeapButton.onclick = this.clearCallback.bind(this);
	this.buildHeapButton.onclick = this.randomMinHeapCallback.bind(this);
	
	console.log("Min");
	this.changeHeapButton.value = "Change to MaxHeap";
	this.changeHeapButton.onclick = this.changeToMaxHeapCallback.bind(this);

	this.clearHeapButton.click();
}

Heap.prototype.changeToMinHeapCallback = function()
{
	this.implementAction(this.changeToMinHeap.bind(this),"");
}

Heap.prototype.changeToMaxHeap = function()
{	
	this.insertField.onkeydown = this.returnSubmit(this.insertField, this.insertMaxHeapCallback.bind(this), 4, true);
	this.insertButton.onclick = this.insertMaxHeapCallback.bind(this);

	this.insertPriorityField.onkeydown = this.returnSubmit(this.insertPriorityField, this.insertMaxHeapCallback.bind(this), 4, true);

	this.removeSmallestButton.onclick = this.removeSmallestMaxHeapCallback.bind(this);
	this.clearHeapButton.onclick = this.clearCallback.bind(this);
	this.buildHeapButton.onclick = this.randomMaxHeapCallback.bind(this);

	console.log("Max");
	this.changeHeapButton.value = "Change to MinHeap";
	this.changeHeapButton.onclick = this.changeToMinHeapCallback.bind(this);

	this.clearHeapButton.click();
}

Heap.prototype.changeToMaxHeapCallback = function()
{	
	this.implementAction(this.changeToMaxHeap.bind(this),"");
}


Heap.prototype.createArray = function()
{
	this.arrayData = new Array(ARRAY_SIZE);
	this.priorityData = new Array(ARRAY_SIZE);

	this.arrayLabels = new Array(ARRAY_SIZE);
	this.arrayRects = new Array(ARRAY_SIZE);

	this.arrayLabels2 = new Array(ARRAY_SIZE);
	this.arrayRects2 = new Array(ARRAY_SIZE);

	this.circleObjs = new Array(ARRAY_SIZE);
	this.ArrayXPositions = new Array(ARRAY_SIZE);
	this.currentHeapSize = 0;
	
	for (var i = 0; i < ARRAY_SIZE; i++)
	{
		this.ArrayXPositions[i] = ARRAY_INITIAL_X + i *ARRAY_ELEM_WIDTH;
		this.arrayLabels[i] = this.nextIndex++;
		this.arrayRects[i] = this.nextIndex++;

		this.arrayLabels2[i] = this.nextIndex++;
		this.arrayRects2[i] = this.nextIndex++;

		this.circleObjs[i] = this.nextIndex++;

		this.cmd("CreateRectangle", this.arrayRects[i], "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, this.ArrayXPositions[i] , ARRAY_Y_POS)
		this.cmd("CreateLabel", this.arrayLabels[i], i,  this.ArrayXPositions[i], ARRAY_LABEL_Y_POS);
		this.cmd("SetForegroundColor", this.arrayLabels[i], "#0000FF");

		this.cmd("CreateRectangle", this.arrayRects2[i], "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, this.ArrayXPositions[i] , (ARRAY_Y_POS+40))
		this.cmd("CreateLabel", this.arrayLabels2[i], i,  this.ArrayXPositions[i], (ARRAY_LABEL_Y_POS+40));
		this.cmd("SetForegroundColor", this.arrayLabels2[i], "#0000FF");
	}
	this.cmd("SetText", this.arrayRects[0], "-INF");
	this.cmd("SetText", this.arrayRects2[0], "-INF");
	this.swapLabel1 = this.nextIndex++;
	this.swapLabel2 = this.nextIndex++;
	this.swapLabel3 = this.nextIndex++;
	this.swapLabel4 = this.nextIndex++;
	this.swapLabel5 = this.nextIndex++;
	this.swapLabel6 = this.nextIndex++;
	this.descriptLabel1 = this.nextIndex++;
	this.descriptLabel2 = this.nextIndex++;
	this.cmd("CreateLabel", this.descriptLabel1, "", 20, 10,  0);
	//this.cmd("CreateLabel", this.descriptLabel2, "", this.nextIndex, 40, 120, 0);
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
}

Heap.prototype.setIndexHighlight = function(index, highlightVal)
{
	this.cmd("SetHighlight", this.circleObjs[index], highlightVal);
	this.cmd("SetHighlight", this.arrayRects[index], highlightVal);
}

Heap.prototype.insertCallback = function(event)
{
	var insertedValue;
	var insertedPriorityValue;

	insertedValue = this.normalizeNumber(this.insertField.value, 4);
	insertedPriorityValue = this.normalizeNumber(this.insertPriorityField.value, 4);

	if (insertedValue != "" && insertedPriorityValue != "")
	{
		this.insertField.value = "";		
		this.insertPriorityField.value = "";
		this.implementAction2(this.insertElement.bind(this),insertedValue, insertedPriorityValue);	
	}
}

Heap.prototype.insertMaxHeapCallback = function(event)
{
	var insertedValue;
	var insertedPriorityValue;

	insertedValue = this.normalizeNumber(this.insertField.value, 4);
	insertedPriorityValue = this.normalizeNumber(this.insertPriorityField.value, 4);

	if (insertedValue != "" && insertedPriorityValue != "")
	{
		this.insertField.value = "";		
		this.insertPriorityField.value = "";
		this.implementAction2(this.insertElementMaxHeap.bind(this),insertedValue, insertedPriorityValue);	
	}
}

//TODO:  Make me undoable!!
Heap.prototype.clear = function()
{
	console.log("clear");
	while (this.currentHeapSize > 0)
	{
		console.log(this.currentHeapSize);	
		this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
		this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
		this.cmd("SetText", this.arrayRects2[this.currentHeapSize], "");
		this.currentHeapSize--;				
	}
	return this.commands;
}

//TODO:  Make me undoable!!
Heap.prototype.clearCallback = function(event)
{
	this.commands = new Array();
	this.implementAction(this.clear.bind(this),"");
}


Heap.prototype.reset = function()
{
	this.commands = [];
	this.clear();
}


Heap.prototype.swap = function(index1, index2)
{
	this.cmd("SetText", this.arrayRects[index1], "");
	this.cmd("SetText", this.arrayRects[index2], "");
	this.cmd("SetText", this.circleObjs[index1], "");
	this.cmd("SetText", this.circleObjs[index2], "");

	this.cmd("SetText", this.arrayRects2[index1], "");
	this.cmd("SetText", this.arrayRects2[index2], "");

	this.cmd("CreateLabel", this.swapLabel1, this.arrayData[index1], this.ArrayXPositions[index1],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel2, this.arrayData[index2], this.ArrayXPositions[index2],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel3, this.arrayData[index1], this.HeapXPositions[index1],this.HeapYPositions[index1]);
	this.cmd("CreateLabel", this.swapLabel4, this.arrayData[index2], this.HeapXPositions[index2],this.HeapYPositions[index2]);

	this.cmd("CreateLabel", this.swapLabel5, this.priorityData[index1], this.ArrayXPositions[index1],(ARRAY_Y_POS+40));
	this.cmd("CreateLabel", this.swapLabel6, this.priorityData[index2], this.ArrayXPositions[index2],(ARRAY_Y_POS+40));

	this.cmd("Move", this.swapLabel1, this.ArrayXPositions[index2],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel2, this.ArrayXPositions[index1],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel3, this.HeapXPositions[index2],this.HeapYPositions[index2])
	this.cmd("Move", this.swapLabel4, this.HeapXPositions[index1],this.HeapYPositions[index1])

	this.cmd("Move", this.swapLabel5, this.ArrayXPositions[index2],(ARRAY_Y_POS+40))
	this.cmd("Move", this.swapLabel6, this.ArrayXPositions[index1],(ARRAY_Y_POS+40))

	var tmp = this.arrayData[index1];	
	this.arrayData[index1] = this.arrayData[index2];
	this.arrayData[index2] = tmp;

	var tmp2 = this.priorityData[index1];
	this.priorityData[index1] = this.priorityData[index2];	
	this.priorityData[index2] = tmp2;

	this.cmd("Step")
	this.cmd("SetText", this.arrayRects[index1], this.arrayData[index1]);
	this.cmd("SetText", this.arrayRects[index2], this.arrayData[index2]);
	this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
	this.cmd("SetText", this.circleObjs[index2], this.arrayData[index2]);

	this.cmd("SetText", this.arrayRects2[index1], this.priorityData[index1]);
	this.cmd("SetText", this.arrayRects2[index2], this.priorityData[index2]);

	this.cmd("Delete", this.swapLabel1);
	this.cmd("Delete", this.swapLabel2);
	this.cmd("Delete", this.swapLabel3);
	this.cmd("Delete", this.swapLabel4);	
	this.cmd("Delete", this.swapLabel5);
	this.cmd("Delete", this.swapLabel6);	
}


