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

	"github.com/lucsky/cuid"
)

type Board struct {
	Id              string `json:"_id"`
	Slug            string `json:"slug"`
	Title           string `json:"title"`
	WorkspaceId     string `json:"workspaceId"`
	CreatedAt       int64  `json:"createdAt"`
	UpdatedAt       int64  `json:"updatedAt"`
	Lists           []List `json:"lists"`
}

type List struct {
	Id        string `json:"_id"`
	Title     string `json:"title"`
	Order     int    `json:"order"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
	Cards     []Card `json:"cards"`
}

type Card struct {
	Id          string `json:"_id"`
	Title       string `json:"title"`
	Order       int    `json:"order"`
	Description string `json:"description"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}

type BoardIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
}

type WorkspaceCacheIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
	Boards []BoardIdentity `json:"boards"`
}

type WorkspaceIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
}

type Settings struct {
	DataPath string `json:"dataPath"`
	Theme string `json:"theme"`
	CurrentBoard string `json:"currentBoard"`
}

// App struct
type App struct {
	ctx                 context.Context
	executablePath      string
	currentBoard        Board
	settings 		    Settings
	workspaceIdentities []WorkspaceCacheIdentity 
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
	a.loadSettings()
	a.loadData()
	fmt.Printf("%v", a.settings)

}

func (a *App) loadSettings() {

	path := "_settings.json"

	if _, err := os.Stat(path); os.IsNotExist(err) {

		s := Settings{
			DataPath: "data",
			Theme: "dark",
		}

		data, err := json.Marshal(s)

		if err != nil {
			log.Fatal("failed serialize settings")
		}

		err = os.WriteFile(path, data, 0644)

		if err != nil {
			log.Fatal("Failed to write settings file")
		}
		
		a.settings = s

	} else {

		f, err := os.ReadFile(path)
		
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(f, &a.settings)

		if err != nil {
			log.Fatal(err)
		}
	}
}

func (a *App) loadData() {
	if _, err := os.Stat(a.settings.DataPath); os.IsNotExist(err) {

		wId := cuid.New()

		err := os.MkdirAll(a.settings.DataPath + "/" + wId + "/boards", os.ModePerm)

		wi := WorkspaceCacheIdentity {
			Id: wId,
			Title: "Default",
			Slug: "default",
		}

		identities := []WorkspaceCacheIdentity {
			{
				Id: wi.Id,
				Title: wi.Title,
				Slug: wi.Slug,
				Boards: []BoardIdentity {
					{
						Id: cuid.New(),
						Title: "My Board",
						Slug: "my-board",
					},
				},
			},
		}

		a.writeDataToFile("_cache.json", identities)
		a.writeDataToFile(wId + "/_workspace.json", wi)

		a.workspaceIdentities = identities

		if err != nil {
			log.Fatal(err)
		}
	} else {
		err := a.readDataFromFile("_cache.json", &a.workspaceIdentities) 

		if err != nil {
			log.Fatal(err)
		}
	}
}

func (a *App) writeDataToFile(path string, data interface{}) error {
	bs, err := json.Marshal(data)

	if err != nil {
		return err
	}

	err = os.WriteFile(a.settings.DataPath + "/" + path, bs, 0644)

	if err != nil {
		return err
	}

	return nil
}

func (a *App) readDataFromFile(path string, dest any) error {
	f, err := os.ReadFile(a.settings.DataPath + "/" + path)
		
	if err != nil {
		return err
	}

	err = json.Unmarshal(f, dest)

	if err != nil {
		return err
	}

	return nil
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

func (a *App) SetCurrentBoard(slug string) Board {
	// f, err := os.ReadFile("data/boards/" + slug + ".json")

	// if err != nil {
	// 	log.Fatal(err)
	// }

	// err = json.Unmarshal(f, &a.currentBoard)

	// if err != nil {
	// 	log.Fatal(err)
	// }

	return a.currentBoard
}

func (a *App) saveCurrentBoard() {
	data, err := json.Marshal(a.currentBoard)

	if err != nil {
		log.Fatal(err)
	}

	path := "data/boards/" + a.currentBoard.Slug + ".json";

	err = os.WriteFile(path, data, 0644)

	if err != nil {
		log.Fatal(err)
	}
}

func (a *App) AddList(l List) Board {
	a.currentBoard.Lists = append(a.currentBoard.Lists, l);
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) UpdateLists(ls []List) Board {
	a.currentBoard.Lists = ls
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) DeleteList(id string) Board {
	index := 0
	for i, v := range a.currentBoard.Lists {
		if v.Id == id {
			index = i
		}
	}
	a.currentBoard.Lists = append(a.currentBoard.Lists[:index], a.currentBoard.Lists[index + 1:]...)
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) GetWorkspaceIdentities() []WorkspaceCacheIdentity {
	return a.workspaceIdentities
}
