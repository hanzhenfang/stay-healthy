.PHONY: clean run 

export VERSION = 1.1.1

super/1.0.1: 1.txt 2.txt
	mkdir "test-$(VERSION)"
	mv 1.txt 2.txt "test-$(VERSION)"

1.txt:
	echo "这是1" > 1.txt

2.txt:
	echo "这是2" > 2.txt

clean:
	export TEST="韩振方";echo "$$TEST"

run: 
	echo "run running"

modify:
	gsed -i "s|\(url: \)\(.*\)|\1v${VERSION}/\2|" stable-arm64-mac.yml
