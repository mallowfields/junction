class Card {
    // Attributes
    constructor(name, description, group){
        this.name = name;
        this.description = description;
        this.group = group;
    }

    // Actions
    setActions(actionList){
        this.actions = actionList;
    }

    // Relations
    setRelations(relationList){
        this.relations = relationList;
    }
}