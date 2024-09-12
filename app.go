package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"os"
	"os/user"
	"path"
)

type Board struct {
	Id              string `json:"_id"`
	Slug            string `json:"slug"`
	Title           string `json:"title"`
	WorkspaceId     string `json:"workspaceId"`
	backgroundColor string `json:"backgroundColor"`
	CreatedAt       int64  `json:"createdAt"`
	UpdatedAt       int64  `json:"updatedAt"`
}

type List struct {
	Id        string `json:"_id"`
	Title     string `json:"title"`
	Order     int    `json:"order"`
	boardId   string `json:"boardId"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
}

type Card struct {
	Id          string `json:"_id"`
	Title       string `json:"title"`
	Order       int    `json:"order"`
	description string `json:"description"`
	listId      string `json:"listId"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}

type BoardIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Path string `json:"path"`
	Slug string `json:"slug"`
}

// App struct
type App struct {
	ctx            context.Context
	executablePath string
	boards         []Board
	boardIdentities  []BoardIdentity
	currentBoard Board
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	currentUser, err := user.Current()
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("Hello " + currentUser.Username)
	a.readBoardsFromJSON()
	a.readBoardIdentities()
	fmt.Println("Boards in dir");
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetOsUserName() string {
	currentUser, err := user.Current()
	if err != nil {
		log.Fatal(err.Error())
	}
	return currentUser.Username
}

func (a *App) GetTestJSON() string {
	return getFileContentsAsString(a.executablePath + "data/test/test.json")
}

func getFileContentsAsString(path string) string {
	f, err := os.ReadFile(path)
	if err != nil {
		return ""
	}
	return string(f)
}

func (a *App) Addboard(b Board) []Board {
	a.boards = append(a.boards, b)
	// a.writeBoardsToJSON()
	a.createNewBoardFile(b)
	return a.boards
}

func (a *App) ReadBoardsDir() []string {
	dir := "data/boards"
	root := os.DirFS(dir)
	jsonFiles, err := fs.Glob(root, "*.json")
	var files []string
	if err != nil {
		log.Fatal(err)
	}
	for _, v := range jsonFiles {
		files = append(files, path.Join(dir, v))	
	}
	return files
}

func (a *App) RemoveBoard(title string) []Board {
	shouldWrite := false
	for i, b := range a.boards {
		if b.Title == title {
			a.boards = append(a.boards[:i], a.boards[i+1:]...)
			shouldWrite = true
			break
		}
	}

	if shouldWrite {
		a.writeBoardsToJSON()
	}

	return a.boards
}

func (a *App) createNewBoardFile(b Board) {
	data, err := json.Marshal(b)

	if err != nil {
		fmt.Println("Failed to write board")
	}

	path := "data/boards/" + b.Slug + ".json";

	err = os.WriteFile(path, data, 0644)

	if err != nil {
		fmt.Println("Failed to write board")
	}

	a.boards = append(a.boards, b)

	a.updateBoardIdentites(BoardIdentity{Id: b.Id, Title: b.Title, Path: path, Slug: b.Slug})
}

func (a *App) updateBoardIdentites(bi BoardIdentity) {

	
	a.boardIdentities = append(a.boardIdentities, bi)

	data, err := json.Marshal(a.boardIdentities)

	if err != nil {
		fmt.Println("Failed to write board identities")
	}

	path := "data/boards/_identities.json";

	err = os.WriteFile(path, data, 0644)

	if err != nil {
		fmt.Println("Failed to write board identities")
	}

}

func (a *App) writeBoardsToJSON() {
	//update file
	data, err := json.Marshal(a.boards)

	if err != nil {
		fmt.Println("Failed to save boards")
	}

	err = os.WriteFile("data/boards/boards.json", data, 0644)

	if err != nil {
		fmt.Println("Failed to save boards")
	}
}

func (a *App) readBoardsFromJSON() {
	f, err := os.ReadFile("data/boards/boards.json")

	if err != nil {
		fmt.Println("No boards file found")
		return
	}

	err = json.Unmarshal(f, &a.boards)

	if err != nil {
		panic(err)
	}
}


func (a *App) readBoardIdentities() {
	f, err := os.ReadFile("data/boards/_identities.json")

	if err != nil {
		fmt.Println("No identities file found")
	}

	err = json.Unmarshal(f, &a.boardIdentities)

	if err != nil {
		panic(err)
	}
}

func (a *App) GetBoards() []Board {
	return a.boards
}

func (a *App) GetBoardIdentities() []BoardIdentity {
	return a.boardIdentities
}
