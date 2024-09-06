package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/user"
)

// App struct
type App struct {
	ctx context.Context
	executablePath string
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
