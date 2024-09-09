package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/user"
)

type Board struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	WorkspaceId string `json:"workspaceId"`
	backgroundColor string `json:backgroundColor`
	CreatedAt int64 `json:createdAt`
	UpdatedAt int64 `json:updatedAt`
}

// App struct
type App struct {
	ctx context.Context
	executablePath string
	boards []Board
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
	a.writeBoardsToJSON()
	return a.boards;
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
		fmt.Println("No boards file found");
		return
	}

	err = json.Unmarshal(f, &a.boards)

	if err != nil {
		panic(err)
	}
}

func (a *App) GetBoards() []Board {
	return a.boards
}
